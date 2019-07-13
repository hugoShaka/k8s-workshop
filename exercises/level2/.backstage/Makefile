all: build push

build-producer:
	docker build producer/ -f producer/Dockerfile -t workshopk8s/k8s-workshop-level2-producer

build-worker:
	docker build worker/ -f worker/Dockerfile -t workshopk8s/k8s-workshop-level2-worker

build: build-producer build-worker

push-worker:
	docker push workshopk8s/k8s-workshop-level2-worker

push-producer:
	docker push workshopk8s/k8s-workshop-level2-producer

push: push-worker push-producer
