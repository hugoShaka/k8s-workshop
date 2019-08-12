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

start: ## Start k3s cluster
	@${DOCKER_COMPOSE_CMD} up -d
	@${DOCKER_COMPOSE_CMD} ps

stop: ## Stop k3s cluster (also purge docker volumes)
	@${DOCKER_COMPOSE_CMD} down --volumes

cluster-info: ## Get cluster infos
	${KUBECTL_CMD} cluster-info

# Level start template
template.level%.start: template.level%.stop
	@echo "${COLOR}# ---------------------------${NC}"
	@echo "${COLOR}# Start level$* resources ...${NC}"
	@echo "${COLOR}# ---------------------------${NC}"
	@echo "${COLOR}${BOLD}Take a look at 'exercises/level$*/README.md' !${NC}"
	${KUBECTL_CMD} -n level$* apply -f level$*/.backstage/level$*.yml

# Level stop template
template.level%.stop:
	@echo "${COLOR}# -----------------------------${NC}"
	@echo "${COLOR}# Delete level$* ressources ...${NC}"
	@echo "${COLOR}# -----------------------------${NC}"
	-${KUBECTL_CMD} delete namespace level$*

# Level logs template
template.level%.logs:
	@echo "${COLOR}# ------------------------------${NC}"
	@echo "${COLOR}# Display level$* ressources ...${NC}"
	@echo "${COLOR}# ------------------------------${NC}"
	-${KUBECTL_CMD} -n level$* get configmap,secret,ingress,svc,deploy,pod,rs,job,cronjob,pv,pvc

##
## Level 001
## ---------
##

level1.start: template.level1.start ## Start level1
level1.stop: template.level1.stop ## Stop  level1
level1.logs: template.level1.logs ## Display all ressources of level1 namespace

##
## Level 002
## ---------
##

level2.start: template.level2.start ## Start level2
level2.stop: template.level2.stop ## Stop  level2
level2.logs: template.level2.logs ## Display all ressources of level2 namespace

##
## Level 003
## ---------
##

level3.start: template.level3.start ## Start level3
level3.stop: template.level3.stop ## Stop  level3
level3.logs: template.level3.logs ## Display all ressources of level3 namespace

##
## Level 004
## ---------
##

level4.start: template.level4.start ## Start level4
level4.stop: template.level4.stop ## Stop  level4
level4.logs: template.level4.logs ## Display all ressources of level4 namespace

##
## Level 005
## ---------
##

level5.start: template.level5.start ## Start level5
level5.stop: template.level5.stop ## Stop  level5
level5.logs: template.level5.logs ## Display all ressources of level5 namespace

##
## Level 006
## ---------
##

level6.start: template.level6.start ## Start level6
level6.stop: template.level6.stop ## Stop  level6
level6.logs: template.level6.logs ## Display all ressources of level6 namespace

##
## Level 007
## ---------
##

level7.start: template.level7.start ## Start level7
level7.stop: template.level7.stop ## Stop  level7
level7.logs: template.level7.logs ## Display all ressources of level7 namespace

##
## Level 008
## ---------
##

level8.start: template.level8.start ## Start level8
level8.stop: template.level8.stop ## Stop  level8
level8.logs: template.level8.logs ## Display all ressources of level8 namespace

##
## Level 009
## ---------
##

level9.start: template.level9.start ## Start level9
level9.stop: template.level9.stop ## Stop  level9
level9.logs: template.level9.logs ## Display all ressources of level9 namespace

##
## Level 010
## ---------
##

level10.start: template.level10.start ## Start level10
level10.stop: template.level10.stop ## Stop  level10
level10.logs: template.level10.logs ## Display all ressources of level10 namespace
