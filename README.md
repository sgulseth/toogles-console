# Toogles Console

[![Docker Repository on Quay](https://quay.io/repository/sgulseth/toogles-console/status "Docker Repository on Quay")](https://quay.io/repository/sgulseth/toogles-console)

Toogles console is a management console for the feature flag service [toogles](https://github.com/sgulseth/toogles).

## Getting started

Toogles console requires two environment variables to be set when started

 * `API_URL`: Which host and port the toogles service running on. ie: `API_URL="http://127.0.0.1:8080"`.
 * `API_TOKEN`: The api token key to manage and set new feature.

 Optional environment variables:

 * `PORT`: Which port should toogles listen on. Defaults to `9000`.


### Docker

```
$ docker pull quay.io/sgulseth/toogles-console
$ docker run -e "API_URL=http://127.0.0.1:8080" \
    -e "API_TOKEN=..." -p 9000:9000 \
    quay.io/sgulseth/toogles-console
```

### Locally
```
$ git clone https://github.com/sgulseth/toogles
$ npm install
$ npm run build
$ npm start
```