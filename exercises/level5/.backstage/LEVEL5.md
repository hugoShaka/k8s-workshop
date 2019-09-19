## Concepts

Configuration management through environment variables.

## Course example

- A web application that reads it name and background color from environment variable.
  - The admin password is also in an environment variable.
  - The application reads content from a file.
  - The user have to recover the password from the secret.
  - The user have to edit a configmap, see that nothing is deployed, delete the pod, see that changes are done.
  - The user have to do versioned configmaps with the site content.

- [OPTIONAL] The app need to pull some private Docker image, learner need to provide secret containing docker registry credentials.

## Capacities

- Understand that base64 is not encryption
- read and wwrite configmap/secrets
- use as environment variable
- mount as a file
- understand that configuration should be versioned 
