# Exercice 1

Fix and run your own slackbot on kubernetes.

There is already a slackbot in the level namespace but it looks broken.

## Investigate

You may want to list running pods in level 1.

*Note : All the commands should be prefixed by `-n level1`, this makes you work
on the namespace "level1"*

```
./workshopctl -n level1 get pods
```

So, there is a pod, you can try to get more info by doing

```
# describes the object, useful for debug
./workshopctl -n level1 describe pod <POD_NAME>
```

That's a lot of information. You may want to look at :
* the Containers section: describing what is running in the pod
* the Conditions section: describing how kubernetes considers the pod
* the Events section: listing what happened since the object was created

Do yo have an idea why is the slackbot not working ? It looks like the pod is
healthy and kubernetes happy.

## Accessing the logs

Let's check the pod's logs.

As there is only one container in the pod we don't have to specify which
container we wanna see the logs.

```
./workshopctl -n level1 logs <POD_NAME>
```

It looks like we gave a wrong argument to the container.

*Note: This is a stupid reference to The Hitchhiker's Guide to the Galaxy, the
answer should be 42.*

As the `describe` indicates the answer is passed through environment variables
(as advised in the 12 factor manifesto)[https://12factor.net/], and the
variable does look wrongly defined.

## Writing a working slackbot manifest

Now we know why the slackbot is broken, and we want to create a good and
working pod.

Let's create a file `pod-working-slackbot.yml`

To create a pod you can take a look here in the pod documentation :
https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/#pod-templates

To pass environment variables the documentation is here
https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/#define-an-environment-variable-for-a-container

If you don't know what variables to define you can take a look at the actual
slackbot bot by doing:

```
./workshopctl -n level1 get pod broken-slackbot -o yaml
```

**IMPORTANT : specify `metadata.namespace` to `level1`**
In the end you should have something like:

```
---
apiVersion: v1
kind: Pod
metadata:
  name: working-slackbot
  namespace: level1
spec:
    # [container spec with name, image and env variables].
```

Let's apply our manifest:

```
./workshopctl apply -f level1/pod-working-slackbot.yml
```

If everything went smoothly you can check the slack channel for the
confirmation you succeeded.

## Cleaning up and teardown

You can delete your pod and clean the namespace by doing:
```
/workshopctl -n level1 delete pod working-slackbot
```

You're done !
