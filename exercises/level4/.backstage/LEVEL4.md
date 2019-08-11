## Concepts

Liveness, readiness, probes, rollouts.

## Course example

A PHP web application with a liveness on each container and a readiness on the nginx with a HTTP request. Actual version is version 1.
When rolling to version 2 the PHP container hangs for a minute during its entrypoint, the liveness triggers to fast and fails.
Version 2.1 fixes the PHP container.
Version 3 serves 404, so the liveness are OK but the container is never ready.
Version 3.1 fixes that.

## Capacities

- understand which probe to use when
- choose probes delays, timeouts, ...
- perform a rolling update
- wait for a rollout to finish

# A fournir par Thibaut:

Faire une app Symfony avec 2 routes
- `/` --> renvoie la homepage, contenu html statique bidon
- `/health` --> renvoie une 200 ou une 500 (en fonction d'une variable en buildarg dans le dockerfile)
