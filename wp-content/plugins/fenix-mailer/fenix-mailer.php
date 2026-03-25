<?php
/**
 * Plugin Name: Fenix Mailer
 * Description: Sends all WordPress emails via Mailgun HTTP API. Configure at Settings > Fenix Mailer.
 * Version: 1.0.0
 */

defined('ABSPATH') || exit;

// ── Settings page ────────────────────────────────────────────────────────────

add_action('admin_menu', function () {
    add_options_page('Fenix Mailer', 'Fenix Mailer', 'manage_options', 'fenix-mailer', 'fenix_mailer_page');
});

add_action('admin_init', function () {
    register_setting('fenix_mailer', 'fenix_mailer', ['sanitize_callback' => 'fenix_mailer_sanitize']);
});

function fenix_mailer_sanitize($in) {
    return [
        'api_key'    => sanitize_text_field($in['api_key']    ?? ''),
        'domain'     => sanitize_text_field($in['domain']     ?? ''),
        'from_name'  => sanitize_text_field($in['from_name']  ?? ''),
        'from_email' => sanitize_email($in['from_email']      ?? ''),
        'region'     => ($in['region'] ?? 'us') === 'eu' ? 'eu' : 'us',
    ];
}

function fenix_mailer_page() {
    $o = get_option('fenix_mailer', []);
    $configured = !empty($o['api_key']) && !empty($o['domain']);
    ?>
    <div class="wrap">
        <h1>Fenix Mailer</h1>
        <p>Sends all <code>wp_mail()</code> calls via Mailgun HTTP API. No SMTP needed.</p>

        <?php if ($configured): ?>
            <div class="notice notice-success inline"><p>&#10003; Configured — using domain <strong><?php echo esc_html($o['domain']); ?></strong></p></div>
        <?php else: ?>
            <div class="notice notice-warning inline"><p>Not configured — fill in the fields below.</p></div>
        <?php endif; ?>

        <form method="post" action="options.php" style="margin-top:1.5rem">
            <?php settings_fields('fenix_mailer'); ?>
            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row"><label for="fm_key">Mailgun API Key</label></th>
                    <td><input id="fm_key" type="password" name="fenix_mailer[api_key]"
                            value="<?php echo esc_attr($o['api_key'] ?? ''); ?>"
                            class="regular-text" autocomplete="off" /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="fm_domain">Sending Domain</label></th>
                    <td>
                        <input id="fm_domain" type="text" name="fenix_mailer[domain]"
                            value="<?php echo esc_attr($o['domain'] ?? ''); ?>"
                            class="regular-text" placeholder="mg.yourdomain.com" />
                        <p class="description">The domain you verified in Mailgun (e.g. <code>mg.fenixnordic.solutions</code>).</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row"><label for="fm_fname">From Name</label></th>
                    <td><input id="fm_fname" type="text" name="fenix_mailer[from_name]"
                            value="<?php echo esc_attr($o['from_name'] ?? 'Fenix Nordic Solutions'); ?>"
                            class="regular-text" /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="fm_femail">From Email</label></th>
                    <td><input id="fm_femail" type="email" name="fenix_mailer[from_email]"
                            value="<?php echo esc_attr($o['from_email'] ?? ''); ?>"
                            class="regular-text" placeholder="hello@mg.fenixnordic.solutions" /></td>
                </tr>
                <tr>
                    <th scope="row"><label for="fm_region">Region</label></th>
                    <td>
                        <select id="fm_region" name="fenix_mailer[region]">
                            <option value="us" <?php selected($o['region'] ?? 'us', 'us'); ?>>US — api.mailgun.net</option>
                            <option value="eu" <?php selected($o['region'] ?? 'us', 'eu'); ?>>EU — api.eu.mailgun.net</option>
                        </select>
                    </td>
                </tr>
            </table>
            <?php submit_button('Save Settings'); ?>
        </form>

        <hr style="margin:2rem 0">
        <h2>Send Test Email</h2>
        <?php
        if (isset($_POST['fenix_test_nonce']) && wp_verify_nonce($_POST['fenix_test_nonce'], 'fenix_mailer_test')) {
            $to = sanitize_email($_POST['test_to'] ?? '');
            if ($to) {
                $ok = wp_mail($to, 'Fenix Mailer — test', 'If you received this, Mailgun is working correctly.');
                echo $ok
                    ? '<div class="notice notice-success inline"><p>&#10003; Sent. Check your inbox.</p></div>'
                    : '<div class="notice notice-error inline"><p>&#10007; Send failed — check your API key, domain, and Mailgun logs.</p></div>';
            }
        }
        ?>
        <form method="post" style="margin-top:1rem">
            <?php wp_nonce_field('fenix_mailer_test', 'fenix_test_nonce'); ?>
            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row"><label for="fm_testto">Send test to</label></th>
                    <td><input id="fm_testto" type="email" name="test_to"
                            class="regular-text" placeholder="you@example.com" required /></td>
                </tr>
            </table>
            <?php submit_button('Send Test Email', 'secondary'); ?>
        </form>
    </div>
    <?php
}

// ── Intercept wp_mail → Mailgun API ─────────────────────────────────────────

add_filter('pre_wp_mail', 'fenix_mailer_send', 10, 2);

function fenix_mailer_send($null, $atts) {
    $o = get_option('fenix_mailer', []);

    if (empty($o['api_key']) || empty($o['domain'])) {
        return null; // not configured — let WP fall back to default
    }

    $base = $o['region'] === 'eu'
        ? 'https://api.eu.mailgun.net'
        : 'https://api.mailgun.net';

    $to      = is_array($atts['to']) ? implode(', ', $atts['to']) : $atts['to'];
    $from    = trim($o['from_name']) . ' <' . trim($o['from_email']) . '>';
    $reply   = fenix_mailer_header($atts['headers'], 'Reply-To');

    $body = [
        'from'    => $from,
        'to'      => $to,
        'subject' => $atts['subject'],
        'text'    => $atts['message'],
    ];

    if ($reply) {
        $body['h:Reply-To'] = $reply;
    }

    $response = wp_remote_post(
        "{$base}/v3/{$o['domain']}/messages",
        [
            'headers' => [
                'Authorization' => 'Basic ' . base64_encode('api:' . $o['api_key']),
            ],
            'body'    => $body,
            'timeout' => 15,
        ]
    );

    if (is_wp_error($response)) {
        error_log('Fenix Mailer error: ' . $response->get_error_message());
        return false;
    }

    $code = wp_remote_retrieve_response_code($response);
    if ($code !== 200) {
        error_log('Fenix Mailer HTTP ' . $code . ': ' . wp_remote_retrieve_body($response));
        return false;
    }

    return true;
}

function fenix_mailer_header($headers, $name) {
    foreach ((array) $headers as $h) {
        if (stripos($h, $name . ':') === 0) {
            return trim(substr($h, strlen($name) + 1));
        }
    }
    return '';
}
