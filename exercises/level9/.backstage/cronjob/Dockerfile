FROM alpine:3.10

ENV WORKDIR /home/docker
WORKDIR ${WORKDIR}

RUN apk add --update --no-cache curl
ADD curl.sh ${WORKDIR}/curl.sh

CMD /bin/sh ${WORKDIR}/curl.sh
