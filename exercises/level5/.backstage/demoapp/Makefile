COMPOSE_CMD    = docker-compose -f docker-compose.yml
DOCKER_BUILDER = docker
DOCKER_IMG_TAG = latest
DOCKER_IMG     = workshopk8s/k8s-workshop-level5:${DOCKER_IMG_TAG}

##
## -----------------------
## LEVEL5
##
## Available make targets
## -----------------------
##

all: help
help: ## Display these message
	@grep -E '(^[a-zA-Z0-9_-.]+:.*?##.*$$)|(^##)' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

start: ## Start demoapp
	${COMPOSE_CMD} up -d
	${COMPOSE_CMD} ps

stop: ## Stop demoapp
	${COMPOSE_CMD} down

restart: stop start ## Restart demoapp

install: ## Install demoapp
	${COMPOSE_CMD} run --rm app sh -c "yarn install"

shell: ## Start new shell in demoapp container
	${COMPOSE_CMD} run --rm app sh

docker.build: ## Build demoapp docker image
	${DOCKER_BUILDER} build -t ${DOCKER_IMG} --target prod .
	${DOCKER_BUILDER} push ${DOCKER_IMG}
