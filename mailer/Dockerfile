FROM php:8.5-apache
# APCu is built from the GitHub release tarball instead of `pecl install`:
# pecl.php.net answered HTTP 500 during the 21 Oct 2026 PHP security release
# and the image must not depend on it. docker-php-ext-install handles
# phpize/configure/make/enable for sources placed under /usr/src/php/ext.
ARG APCU_VERSION=5.1.28
RUN a2enmod rewrite && \
    sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf && \
    curl -fsSL "https://github.com/krakjoe/apcu/archive/refs/tags/v${APCU_VERSION}.tar.gz" -o /tmp/apcu.tar.gz && \
    mkdir -p /usr/src/php/ext/apcu && \
    tar -xzf /tmp/apcu.tar.gz -C /usr/src/php/ext/apcu --strip-components=1 && \
    docker-php-ext-install apcu && \
    rm -rf /tmp/apcu.tar.gz /usr/src/php/ext/apcu
COPY . /var/www/html/
