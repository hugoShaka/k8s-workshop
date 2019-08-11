#!/bin/sh
set -e

# first arg is `-f` or `--some-option`
if [[ "${1#-}" != "$1" ]]; then
    set -- php-fpm "$@"
fi

if [[ "$1" = 'php-fpm' ]] || [[ "$1" = 'php' ]] || [[ "$1" = 'bin/console' ]]; then
    echo "Create var/cache var/log directories ..."
    mkdir -p var/cache var/log
    chmod 777 -R var

    echo "Waiting for db to be ready ..."
    until bin/console doctrine:query:sql "SELECT 1" > /dev/null 2>&1; do
        echo "db is not ready yet"
        sleep 2
    done

    echo "Run db migration ..."
    bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration
fi

exec docker-php-entrypoint "$@"
