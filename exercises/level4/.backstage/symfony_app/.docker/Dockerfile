##
# PHP BASE
##
FROM php:7.3-fpm AS php_base

ENV WORKDIR=/home/docker
WORKDIR $WORKDIR

ENV COMPOSER_ALLOW_SUPERUSER=1
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN apt-get update \
    # Install packages
    && apt-get install -y libpq-dev libxrender-dev gettext-base openssh-client wget git make cmake libssl-dev libssl-doc libxml2-dev libcurl3-dev unzip libzip-dev zlib1g-dev gnupg2 dirmngr lsb-release apt-transport-https vim --no-install-recommends \
    # Install Php extentions
    && docker-php-ext-install pdo pdo_pgsql zip json bcmath mbstring curl \
    # Install Symfony Flex globally to speed up download of Composer packages (parallelized prefetching)
    && composer global require "symfony/flex" --prefer-dist --no-progress --no-suggest --classmap-authoritative \
    # Set TimeZone
    && ln -snf /usr/share/zoneinfo/"Europe/Paris" /etc/localtime \
    && echo "Europe/Paris" > /etc/timezone \
    # Set timezone
    && echo 'date.timezone=Europe/Paris' >> /usr/local/etc/php/conf.d/custom.ini \
    # Create symlink to php.ini
    && ln -s $PHP_INI_DIR/php.ini-production $PHP_INI_DIR/php.ini

COPY --chown=root:root .docker/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]

CMD ["php-fpm"]


##
# PHP PROD
##
FROM php_base AS php_prod

ENV APP_ENV=prod

# Copy code
COPY --chown=devops:devops . .

# Install Packages
RUN set -eux; \
    composer install --prefer-dist --no-dev --no-autoloader --no-scripts --no-progress --no-suggest; \
    composer clear-cache; \
    mkdir -p var/cache var/log; \
    composer dump-autoload --classmap-authoritative --no-dev; \
    composer run-script --no-dev post-install-cmd;

##
# NGINX
##
FROM nginx:alpine AS nginx_prod

ENV WORKDIR=/home/docker
WORKDIR $WORKDIR

COPY .docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=php_prod $WORKDIRr/public $WORKDIR/public/

CMD ["nginx", "-g", "daemon off;"]
