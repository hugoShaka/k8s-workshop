## LEVEL 8
- Persitance
- Volume

### Objectives

- Undestanding data persitence
- Learn about volumes in Kubernetes
- Write and use a Persistent volume claim
- Understand limits of volume

### Instructions

- Start the level, `make level8.start` or 
```bash
# Start the level
./workshopctl -n level8 apply -f level8/.backstage/level8.yml
./workshopctl -n level8 apply -f level8/.backstage/local-path-provisionner.yml
# Check status
./workshopctl -n level8 get all
```

- Go to website (http://upload.level8.localhost/) and upload a file
- Delete the pod to force a restart
```bash
./workshopctl -n level8 delete pods --all
```

- Go to the website (http://upload.level8.localhost/) again, the file uploaded disappeared

File or anything stored on the disk is not persisted in a restart, for that you need to put a persistant volume in place:

https://kubernetes.io/docs/concepts/storage/volumes/
https://kubernetes.io/docs/concepts/storage/persistent-volumes

The main types used are:
- `emptyDir` https://kubernetes.io/docs/concepts/storage/volumes/#emptydir to share data between container on the same pod (Clean each time a pod is stopped)
- `persistentVolumeClaim` https://kubernetes.io/docs/concepts/storage/volumes/#persistentvolumeclaim to get a more permanent type of volume whithout having to know the details

Fo our example, a persistent volume provisionning has already been set up, you will need to:
- Create a persistent volume claim (PVC) (https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims) with the storage class `local-path`
- Add the volume to the existing deployment (https://kubernetes.io/docs/concepts/storage/persistent-volumes/#claims-as-volumes)
The yaml of the deployment to modify :
```yaml
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: upload-deployment
  labels:
    app: upload
spec:
  replicas: 1
  selector:
    matchLabels:
      app: upload
  template:
    metadata:
      labels:
        app: upload
    spec:
      containers:
      - name: upload
        image: workshopk8s/k8s-workshop-level8-upload
        ports:
        - containerPort: 8080
        env:
        - name: "PORT"
          value: "8080"
        - name: "UPLOAD_DIR"
          value: "/uploads"
```

Once you create and applied the PVC and the new deployment (see level8/.solution/volume.yml in case of issue), you can test the result by uploading files and deleting the pods to force a restart

### Limits
Persistent volume have the physical limit in that they can only be mounted once in Read/Write once or multiple times in Read Only.  

To scale application, it is advised to use distant storage such as AWS S3 or GCS Buckets 