DOCKER_BUILDER = docker
DOCKER_IMG_TAG = latest
DOCKER_IMG     = workshopk8s/k8s-workshop-level9-cronjob:${DOCKER_IMG_TAG}

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

docker.login: ## Login to docker registry
	${DOCKER_BUILDER} login

docker.build: ## Build cron docker image
	${DOCKER_BUILDER} build -t ${DOCKER_IMG} .
	${DOCKER_BUILDER} push ${DOCKER_IMG}
