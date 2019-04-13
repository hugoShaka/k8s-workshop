all: build push

build:
	docker build -f docker/Dockerfile.slackbot ./docker -t hugoshaka/k8s-workshop-level1-slackbot

push: build
	docker push hugoshaka/k8s-workshop-level1-slackbot
