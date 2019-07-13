all: build push

build:
	docker build -f docker/Dockerfile.slackbot ./docker -t workshopk8s/k8s-workshop-level1-slackbot

push: build
	docker push workshopk8s/k8s-workshop-level1-slackbot
