# Happy news api

A backend api for [happy news](https://tjoskar.github.io/service-worker-exercises/).

This project is serving as backend for my service worker tutorial: https://github.com/tjoskar/service-worker-exercises

### Endpoints

base url: https://happy-news-nmnepmqeqo.now.sh

- `GET /`: The 15 latest articles. A new article is published every minute
- `GET /{id}`: Detail information for a specific article
- `POST /register`: Register a push notification subscription. The body must include `endpoint`, `auth` and `p256dh`
