# data

## users

    - id
    - name
    - email
    - password
    - createdAt

## services

    - id
    - name
    - description?
    - maintainer (userId)
    - isActive
    - apiKey (_:)
    - createdAt

<!-- - allowedURLs  https://dev.mysql.com/doc/refman/5.7/en/json.html -->

## feedbacks

    - id
    - type ("COMMENT", "COMPLAINT", "IDEA" or "OTHER")
    - content
    - service (apiKey)
    - customerEmail?
    - createdAt

<!-- ## NPS

    - id
    - service (apiKey)
    - rating [1 - 10]
    - createdAt -->

# actions

## user

    - create a new service
    - delete a service
    - suspend a service
    - update a service

## client

    - send a feedback via widget
    <!-- - send it's NPS via widget -->

# components

## widget

<!-- - two tabs (NPS and feedbacks) -->

- submit button (enabled only with textarea or stars filed)
  <!-- (nps) - 10 stars to fill -->
  (feedbacks) - issue, idea, complaint and other button - description textarea - user email input (optional)

## api (routes)

    - signup (body: userData) POST::/signup [return token(userId)]
    - login (body: email; password) POST::/login [return token(userId)]

    - create a service (body: serviceData, header: token(userId)) POST::/services/
    - delete a service (body: apiKey, header: token(userId)) DELETE::/services/
    - suspend a service (body: serviceData apiKey, header: token(userId)) PATCH::/services/

    - list all services by user (header: token(userId)) GET::/services/
    - list all service's feedbacks (header: token(userId)) GET::/services/:apiKey/feedbacks/
    (orderBy date; count types, percent by types, count all)
    <!-- - list service's NPS (header: token(userId)) GET::/services/:apiKey/nps/
    (orderBy date; count all; detractors; promoters; passives; level[greate, good , regular, bad]; nps) -->

    - register a feedback (body: feedbackData, header: apiKey) POST::/feedbacks/ 204 [max 20 request per day]
    <!-- - register a NPS (body: rating[1-10], header: apiKey) POST::/nps/ 204 [max 20 request per day] -->

<!-- - list all feedbacks by adm (userId) (orderBy date; count types) -->

## page

### dashboard

    - list all services by user (orderBy date; count types, percent by types, count all)

<!-- - average of NPS feebacks -->

### service page

    - list feedbacks by service
    - feedback's chart
    <!-- - show NPS info (detractors, passive, promoters, general nps, level) (maybe some chart too) -->

# rules

- if a service is not active, lists requests will receive a message like ["this service is temporary disabled"]
- all IDs (except apiKey) will be UUIDs
- each service has a maximum of 20 feedbacks and 20 for NPS request per day
- if the client send a feedback with email, allow service manager to send a message to this email

# tools and feats

- rate limit (20 req/day) (see headers) => limit feedbacks and nps by service
- redis
- postgreSQL (typeorm) => tables relationship
- SOLID
- Clean Architecture
- TDD and DDD
- CI and CD (github workflow | travis CI) => automatic deploy on heroku and testing
- GraphQL => reduce overfetch (only a few routes)
- custom 404 page
- docker => create all aplication environment toggether
- graceful shutdown => shutdow application correctly
- documentation page (ejs renderized page) => substitute swagger api

# future features

- login with google account
- create a react component, and share it via npm
- create plans to increase feedbacks limits
- use web sockets to list new feedbacks in real time (graphQL)

# learning...

- project plannig
- ci and cd skils
- sql skills
- docker skills and management
- graphql skills
- clean architecture, SOLID and clean code
- data caching

# tasks

[x] create project on heroku
[x] create project on vercel
[x] organize github repositories
[] create docker environment
[] create domain data
[] develop login and signup api
[] configure api server
[] start ci and cd
