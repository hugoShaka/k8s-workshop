all: build push


build.php:
	docker build -f docker-php/Dockerfile ./docker-php --target php_prod -t workshopk8s/k8s-workshop-level8-upload-php

build.nginx:
	docker build -f docker-php/Dockerfile ./docker-php --target nginx_prod -t workshopk8s/k8s-workshop-level8-upload-nginx

push: build.php build.nginx
	docker push workshopk8s/k8s-workshop-level8-upload-php
	docker push workshopk8s/k8s-workshop-level8-upload-nginx
