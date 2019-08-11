COMPOSE_CMD    = docker-compose -f docker-compose.yml
DOCKER_BUILDER = docker
DOCKER_IMG_TAG = latest
DOCKER_IMG     = workshopk8s/k8s-workshop-level4:${DOCKER_IMG_TAG}

##
## -----------------------
## LEVEL4
##
## Available make targets
## -----------------------
##

all: help
help: ## Display these message
	@grep -E '(^[a-zA-Z0-9_-.]+:.*?##.*$$)|(^##)' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

start: ## Start symfony app
	${COMPOSE_CMD} up -d --build
	${COMPOSE_CMD} ps

stop: ## Stop symfony app
	${COMPOSE_CMD} down

restart: stop start ## Restart symfony app

install: ## Install symfony app
	${COMPOSE_CMD} run --rm php bash -c "composer install"
	$(MAKE) db.init

db.init: ## Init symfony app database
	${COMPOSE_CMD} run --rm php bash -c "php bin/console doctrine:database:create --if-not-exists"
	${COMPOSE_CMD} run --rm php bash -c "php bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration"

shell: ## Start new shell in symfony app container
	${COMPOSE_CMD} run --rm php bash

logs: ## Display app logs
	${COMPOSE_CMD} logs -f

docker.login: ## Login to docker registry
	${DOCKER_BUILDER} login

docker.build: ## Build symfony app docker image
	${DOCKER_BUILDER} build -t ${DOCKER_IMG} --target php_prod .
	${DOCKER_BUILDER} push ${DOCKER_IMG}
