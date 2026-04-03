FROM php:8.5-apache
RUN a2enmod rewrite && \
    sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf && \
    pecl install apcu && \
    docker-php-ext-enable apcu
COPY . /var/www/html/
