# Exercise 2

## Introduction

We're running a webmarket service, our customers send us orders.
And we should treat them as fast as we can.
Our application got two components :
- a producer that recieves orders and queue them
- a consumer that reads the queue and treat orders

The queue system is rabbitmq.

We're currently under a huge load and customer success teams are reporting
growing delays.

## Investigate

1. Let's take a look at the queue service

Use a web browser to access : http://rabbitmq.level2.localhost:8090/
(login/password = guest/guest)
On the Queues page you can access our queue `customer_orders` by clicking on
its name.

Are we able to keep up with the load ?

We currently only have one consumer, regarding it's consumption rate, how many
would we need to get back on track ?

You can get our consumer pod running by doing
```
./workshopctl -n level2 get pod consumer
```

## Planning the scale out

The consumer is stateless.

Side note about statelessness :
> There are many "stateless" definitions but I like this one :
> * the output o(t) to an input i(t) will not depend of past inputs or outputs
>   i(t-1), o(t-1), i(t-2), ...
> * all the inputs are treated independently, each input got its output, always
>   the same.
> 
> This means we can take two identical stateless systems, send to each one half
> the requests and they will be able to provide the good outputs but twice as
> fast as with only one system.

> Most of real systems are not stateless because we need to remember a lot of
> stuff, for example how many credits does this user still have on its account.
> A common pattern is to extract stateless parts out of the system, this way
> we're able to "scale" them as we want.

Here our consumer pod treats all orders independently, so we can start the same
pod many times in order to consume orders faster.

The kubernetes object handling this is the replicaset. It's a set of pods, all
the same (all replicas -> replicaset). All the pods are stateless : they are
started in a random order (asap), with no restriction. If a pod dies another
will be started somewhere else.

The consumer pod specification is written in consumer-pod.yml, we'd like to
create a replicaset which will create many consumer pods.
You can find the replicaset documentation here :
https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/

Basically you have create a replicaSet and put the consumer pod manifest in the
"template" section.

There is a last thing to understand : the labels.
Each kubernetes object can be labeled. A label is composed of a key and a
value. Label's first use is to be able to select and filter objects.
For example if I run the same application in production and in test, I'll be
able to work only with production objects by filtering on the label "stage:
test/production".

Keys and values can be chosen arbitrarily. Common labels are app, service,
staging.

Labels are also the way a replicaset works to get its pods. It's selecting them
based on their labels.

Here is a commented example :

```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: producer
  namespace: level2
  labels:
    # Those labels are the ones that apply to the replicaset object
    app: producer
    author: hugo
spec:
  replicas: 1
  selector:
    matchLabels:
      # Those labels are used to select which pod belongs to the replicaset
      # Any pod matching these labels will be considered as a child by the replicaset
      app: producer
  template:
    metadata:
      labels:
        # Those labels are the ones that apply to the created pods
        app: producer
        kind: example
    spec:
      containers:
      - name: producer
        image: workshopk8s/k8s-workshop-level2-producer
```

## Scaling out

So now you should be able to write a replicaset creating consumers.
When it's done you can deploy with 1 replica.

You can check if its pods are live by doing :
```
./workshopctl -n level2 get replicaset consumer

NAME       DESIRED   CURRENT   READY   AGE
consumer   1         1         1       103m
```

Then, let's scale out and empty our rabbitMQ queues by doing :
```
./workshopctl -n level2 scale replicaset/consumer --replicas=4
```

You can follow the start of the pods by doing
```
./workshopctl -n level2 get replicasets consumer  --watch
```

On the rabbitmq management interface the queue size should be going down.

## Other kind of pod sets

We won't use them for now but you should know that there are other kind of pod
sets :
- statefulsets : used to manage stateful pods, for example if your pod stores
  data on the disk (like a database for example), or if you cannot start all
  the pods at the same time.
- daemonsets : used to manage daemon pods, one running on each server doing
  stuff like metric and log collections, monitoring, ...
