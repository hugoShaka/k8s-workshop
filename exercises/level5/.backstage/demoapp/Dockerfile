#
# BASE
#
FROM node:12-alpine as base

ENV WORKDIR=/home/docker
RUN mkdir -p $WORKDIR
WORKDIR $WORKDIR
EXPOSE 3000

RUN apk --no-cache add git
ENV LISTEN_PORT=3000

#
# PROD
#
FROM base as prod

ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=warn

COPY --chown=node:node . .
RUN yarn install

CMD [ "yarn", "start:prod" ]

#
# DEV
#
FROM base as dev

ENV NODE_ENV=development
ENV NPM_CONFIG_LOGLEVEL=debug

COPY --chown=node:node . .
RUN yarn install

CMD [ "yarn", "start:dev" ]
