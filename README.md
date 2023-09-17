## Coris Explorer

A community-built Blockchain explorer for the cosmos ecosystem, brought to you by Cypher Core LLC

### Local Development

#### Prerequisites

- Git
- Docker

#### Start Up

```
 $ git clone https://github.com/jim380/coris-v2.git
 $ DOCKER_BUILDKIT=1 docker compose build
 $ docker compose up -d
```

The app should be running at [localhost:3000/cosmos](http://localhost:3000/cosmos).

#### Tear Down

```
 $ docker compose down

```
