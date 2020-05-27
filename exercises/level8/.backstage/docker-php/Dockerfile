FROM php:7.4-fpm-alpine AS php_prod

ENV WORKDIR=/home/docker
WORKDIR $WORKDIR

# Set TimeZone
RUN ln -snf /usr/share/zoneinfo/"Europe/Paris" /etc/localtime \
    && echo "Europe/Paris" > /etc/timezone \
    && echo 'date.timezone=Europe/Paris' >> /usr/local/etc/php/conf.d/custom.ini

# Copy code
COPY --chown=www-data:www-data upload.php /home/docker/upload.php

RUN mkdir -p /home/docker/uploads \
    && chown -R www-data:www-data /home/docker

CMD ["php-fpm"]

##
# NGINX
##
FROM nginx:alpine AS nginx_prod

ENV WORKDIR=/home/docker
WORKDIR $WORKDIR

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=php_prod /home/docker/upload.php /home/docker/upload.php

CMD ["nginx", "-g", "daemon off;"]