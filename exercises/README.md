# Kubernetes Workshop

## Before starting

### Requirements

In order to run this workshop you will need :
* docker
* docker-compose
* Linux or OSX

### Starting demo kubernetes

Just run

```
docker-compose up -d
```

It takes about 3 minutes to bootstrap the cluster.

### Pre-flight checks

The whole workshop is built to avoid modifying your system.

**We will use `workshopctl` instead of `kubectl` everytime.**
It's only a wrapper to use local kubectl with the workshop config.

To check if everything is good please execute :

```
./workshopctl cluster-info
```

The expected output is

```
 Installing kubectl in current folder, will not affect your operating system
 [...] Lots of bla bla only on first exec
 Initial setup ok !

Kubernetes master is running at https://localhost:6443
CoreDNS is running at https://localhost:6443/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

### Last-minute notice

Some of the variables are prefixed by `WORKSHOP_`, for example
`WORKSHOP_SLACK_CHANNEL`. When you'll encounter such variables you should
change them by valid values that will be given to you during the workshop and
by slack.

Now you're good to go :).

## Level 1

The basics : reading objects and creating your first pod.

[Link to instructions](./level1/README.md)

## Level 2

How to automatically deploy, restart and scale pods.

[Link to instructions](./level2/README.md)

## Level 3

It's about keeping an history, updating smoothly and rolling back.

## Level 4

Managing application's configuration though kubernetes objects.

## Level 5

Playing with network, how pods advertise themselves and how can one app contact
another inside the cluster.

## Level 6

Real stuff here : exposing your application to the internet, managing incoming
connections.

## Level 7

Storing data, asking for persistant storage.

## Level 8

Doing side-cars and stuff before your application starts.

## Level 9

How to run jobs, one-off or periodically

