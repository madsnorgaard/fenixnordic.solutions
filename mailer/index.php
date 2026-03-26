<?php
header('Content-Type: application/json');

// Only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['error' => 'Method not allowed']));
}

// Require JSON content type
$ct = $_SERVER['CONTENT_TYPE'] ?? '';
if (strpos($ct, 'application/json') === false) {
    http_response_code(415);
    exit(json_encode(['error' => 'Unsupported media type']));
}

// Rate limit: 3 submissions per 10 minutes per IP
// Use X-Forwarded-For (set by Traefik/Cloudflare) over REMOTE_ADDR (Traefik internal)
if (function_exists('apcu_fetch')) {
    $forwarded = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    $ip  = $forwarded ? trim(explode(',', $forwarded)[0]) : ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $key = 'fenix_rl_' . md5($ip);
    $count = apcu_fetch($key, $exists);
    if (!$exists) {
        apcu_add($key, 1, 600);
        $count = 1;
    } else {
        $count = apcu_inc($key);
    }
    if ($count > 3) {
        http_response_code(429);
        exit(json_encode(['error' => 'Too many requests']));
    }
}

$raw  = file_get_contents('php://input');
$body = json_decode($raw, true);
if (!is_array($body)) {
    error_log('Fenix mailer: invalid JSON body — ' . substr($raw, 0, 200));
    http_response_code(400);
    exit(json_encode(['error' => 'Invalid request']));
}

// Honeypot
if (!empty($body['website'])) {
    exit(json_encode(['status' => 'ok']));
}

// Validate
$name    = trim(strip_tags($body['name']    ?? ''));
$email   = filter_var(trim($body['email']   ?? ''), FILTER_VALIDATE_EMAIL);
$message = trim(strip_tags($body['message'] ?? ''));
$company = trim(strip_tags($body['company'] ?? ''));

if (!$name || !$email || !$message) {
    error_log("Fenix mailer: validation failed — name=" . (bool)$name . " email=" . (bool)$email . " msg=" . (bool)$message);
    http_response_code(400);
    exit(json_encode(['error' => 'Required fields missing']));
}

// Length caps
if (mb_strlen($name) > 200 || mb_strlen($company) > 200 || mb_strlen($message) > 5000) {
    http_response_code(400);
    exit(json_encode(['error' => 'Input too long']));
}

// Config from env
$api_key = getenv('MAILGUN_API_KEY');
$domain  = getenv('MAILGUN_DOMAIN');
$region  = getenv('MAILGUN_REGION') ?: 'us';
$from    = getenv('MAIL_FROM')      ?: "Fenix Nordic Solutions <hello@{$domain}>";
$to      = 'phoenixnorgaard@outlook.com, madsnorgaard@live.dk';

if (!$api_key || !$domain) {
    error_log('Fenix mailer: MAILGUN_API_KEY or MAILGUN_DOMAIN not set');
    http_response_code(500);
    exit(json_encode(['error' => 'Mailer not configured']));
}

$base    = $region === 'eu' ? 'https://api.eu.mailgun.net' : 'https://api.mailgun.net';
$subject = "Fenix Nordic — Enquiry from {$name}" . ($company ? " at {$company}" : '');
$text    = "Name: {$name}\n"
         . ($company ? "Company: {$company}\n" : '')
         . "Email: {$email}\n\n"
         . $message;

$ch = curl_init("{$base}/v3/{$domain}/messages");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_USERPWD        => "api:{$api_key}",
    CURLOPT_POSTFIELDS     => [
        'from'       => $from,
        'to'         => $to,
        'subject'    => $subject,
        'text'       => $text,
        'h:Reply-To' => "{$name} <{$email}>",
    ],
    CURLOPT_TIMEOUT        => 15,
]);

$result = curl_exec($ch);
$code   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($code === 200) {
    error_log("Fenix mailer: Mailgun OK — {$result}");
    exit(json_encode(['status' => 'ok']));
}

error_log("Fenix mailer: Mailgun HTTP {$code} — {$result}");
http_response_code(500);
exit(json_encode(['error' => 'Send failed']));
