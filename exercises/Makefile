# Colors
COLOR=\033[0;32m
NC=\033[0m
BOLD=\033[1m

# Vars
DOCKER_COMPOSE_CMD  = docker-compose -f docker-compose.yml
KUBECTL_CONFIG_PATH = .output/kubeconfig.yaml
KUBECTL_CMD         = kubectl --kubeconfig=${KUBECTL_CONFIG_PATH}

##
## Targets to manage the local k3s cluster
## ---------------------------------------
##

all: help
help: ## Display this message
	@grep -E '(^[a-zA-Z0-9_.-]+:.*?##.*$$)|(^##)' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

start: stop ## Start k3s cluster
	@${DOCKER_COMPOSE_CMD} up -d
	@${DOCKER_COMPOSE_CMD} ps

stop: ## Stop k3s cluster (also purge data & volumes)
	@${DOCKER_COMPOSE_CMD} down -v

cluster-info: ## Get cluster infos
	${KUBECTL_CMD} cluster-info

##
## Level 001
## ---------
##

level1.start: ## Start level1
	@$(MAKE) --silent level1.stop
	@echo "${COLOR}Starting level1 resources...${NC}"
	${KUBECTL_CMD} -n level1 apply -f level1/.backstage/level1.yml
	@echo "${BOLD}Take a look at 'exercises/level1/README.md'${NC}"

level1.stop: ## Stop level1
	@echo "${COLOR}Delete level1 namespace to clean ressources${NC}"
	-${KUBECTL_CMD} delete namespace level1

##
## Level 002
## ---------
##

level2.start: ## Start level2
	@$(MAKE) --silent level2.stop
	@echo "${COLOR}Starting level2 resources...${NC}"
	${KUBECTL_CMD} -n level2 apply -f level2/.backstage/level2.yml
	@echo "${BOLD}Take a look at 'exercises/level2/README.md'${NC}"

level2.stop: ## Stop level2
	@echo "${COLOR}Delete level2 namespace to clean ressources${NC}"
	-${KUBECTL_CMD} delete namespace level2
