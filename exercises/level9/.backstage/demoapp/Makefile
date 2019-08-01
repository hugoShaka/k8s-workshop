COMPOSE_CMD    = docker-compose -f docker-compose.yml
DOCKER_BUILDER = docker
DOCKER_IMG_TAG = latest
DOCKER_IMG     = workshopk8s/k8s-workshop-level9-app:${DOCKER_IMG_TAG}

##
## -----------------------
## LEVEL9
##
## Available make targets
## -----------------------
##

all: help
help: ## Display these message
	@grep -E '(^[a-zA-Z0-9_-.]+:.*?##.*$$)|(^##)' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

start: ## Start demoapp
	${COMPOSE_CMD} up -d --build
	${COMPOSE_CMD} ps

stop: ## Stop demoapp
	${COMPOSE_CMD} down

restart: stop start ## Restart demoapp

install: ## Install demoapp
	${COMPOSE_CMD} run --rm app sh -c "yarn install"
	$(MAKE) db.init

shell: ## Start new shell in demoapp container
	${COMPOSE_CMD} run --rm app sh

logs: ## Display app logs
	${COMPOSE_CMD} logs -f app

db.init: ## Init demoapp sqlite database
	${COMPOSE_CMD} run --rm app sh -c "npx sequelize db:migrate"
	${COMPOSE_CMD} run --rm app sh -c "npx sequelize db:seed:all"

db.reset: ## Reset dev demoapp database
	-@rm -v database.dev.sqlite3
	$(MAKE) db.init

docker.login: ## Login to docker registry
	${DOCKER_BUILDER} login

docker.build: ## Build demoapp docker image
	${DOCKER_BUILDER} build -t ${DOCKER_IMG} --target prod .
	${DOCKER_BUILDER} push ${DOCKER_IMG}
