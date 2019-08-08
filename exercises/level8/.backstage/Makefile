all: build push

build:
	docker build -f docker/Dockerfile ./docker -t workshopk8s/k8s-workshop-level8-upload

push: build
	docker push workshopk8s/k8s-workshop-level8-upload

