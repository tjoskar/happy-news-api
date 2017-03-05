# Happy news api

A backend api for happy news. 

This project is serving as backend for my service worker tutorial: 

### Endpoints

base url: https://happy-news-hcooumiahc.now.sh

- `GET /`: The 15 latest articles. A new article is published every minute
- `GET /{id}`: Detail information for a specific article
- `POST /register`: Register a push notification subscription. The body must include `endpoint`, `auth` and `p256dh`
