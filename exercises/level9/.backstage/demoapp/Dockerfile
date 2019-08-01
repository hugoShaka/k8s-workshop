#
# BASE
#
FROM node:12-alpine as base

WORKDIR /home/docker/
EXPOSE 3000

RUN apk --no-cache add git

#
# PROD
#
FROM base as prod

ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=warn

COPY --chown=node:node . .
RUN yarn install \
    && npx sequelize db:migrate \
    && npx sequelize db:seed:all

CMD [ "yarn", "start:prod" ]
