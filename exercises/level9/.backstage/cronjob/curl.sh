#!/usr/bin/env sh

# This script attempt to trigger "emails sending" cron task

if [ -z "${CRON_HOST_URL}" ]; then
    echo "[ERROR] 'CRON_HOST_URL' is not defined. Please define it."
    exit 1
fi

if [ -z "${CRON_AUTH_TOKEN}" ] ; then
    echo "[ERROR] 'CRON_AUTH_TOKEN' is not defined. Please define it."
    exit 1
fi

({
    set -e
    echo "$(date)"
    echo "Attempt to send request to ${CRON_HOST_URL}/cron/email-send ..."

    curl -X POST "${CRON_HOST_URL}/cron/email-send" \
        -H "Content-Type: application/json" \
        -d "{\"token\": \"${CRON_AUTH_TOKEN}\"}"
} || {
    echo "[ERROR] Something wrong happen, exit"
    exit 1
})
