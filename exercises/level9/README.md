## LEVEL 9

- Running jobs.
- Running cron-jobs.

### Objectives

- Understand how "cron" works and behaves under a kubernetes environment
- Learn k8s cron lifecycle 
- Write & describe a cron manifest
- Monitor cron resources
- Debug cron

### Urls
- [app.level9.localhost](http://app.level9.localhost) the express demo application
- [mail.level9.localhost](http://mail.level9.localhost) the mailhog web ui

### Instructions

- Start level9
```bash
# Create demoapp && mail resources
kubectl --kubeconfig=.output/kubeconfig.yaml -n level9 apply -f level9/.backstage/level9.yml

# Get level9 resources
kubectl --kubeconfig=.output/kubeconfig.yaml -n level9 get ingress,svc,deploy,pod,job,configmap,cronjob,job

# Create the cronjob resource
kubectl --kubeconfig=.output/kubeconfig.yaml -n level9 apply -f level9/cron.yml

# Delete all level9 resources when done
kubectl --kubeconfig=.output/kubeconfig.yaml delete namespace level9
```

- List contact client requests :
```bash
curl -v http://app.level9.localhost/contact/list
```

- Create new contact requests :
```bash
curl -v -X POST "http://app.level9.localhost/contact/" \
    -H 'Content-Type: application/json' \
    -d '{"email": "hello@world.com", "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit"}'
```

- Test email sending :
```bash
curl -v -X POST "http://app.level9.localhost/cron/email-send" \
    -H 'Content-Type: application/json' \
    -d '{"token": "e2c0b54a-baf0-4bd8-9cb1-e0151b16e83d"}'
```
