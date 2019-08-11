### LEVEL 4

- Add healthcheck and readiness probes.
- Perform a rolling update.

### Concepts

Liveness, readiness, probes, rollouts.

Course example
- Version 1 A PHP web application with a liveness on each container and a readiness on the nginx with a HTTP request
- Version 2 When rolling to v2, the PHP container hangs for a minute during its entrypoint, the liveness triggers to fast and fails.
- Version 2.1 fixes the PHP container.
- Version 3 serves 404, so the liveness are OK but the container is never ready.
- Version 3.1 fixes that.

Capacities
- understand which probe to use when
- choose probes delays, timeouts, ...
- perform a rolling update
- wait for a rollout to finish
