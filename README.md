# K6_Performance_Testing

## Installation
```
Download Docker : https://www.docker.com/products/docker-desktop/
```
## Running

```bash
docker-compose up -d influxdb grafana
docker-compose run k6 run /scripts/test.js
```

## Open Grafana Dashboard

```
http://localhost:3000/d/k6/k6-load-testing-results
```
