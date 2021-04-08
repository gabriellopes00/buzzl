# data
## users (adm)
	- id; name; email; password; createdAt;

## services
	- id
	- name
	- description?
	- manteiner (admId)
	- isActive
	- createdAt
	- apiKey (_:)
<!-- - allowedURLs  https://dev.mysql.com/doc/refman/5.7/en/json.html -->

## feedbacks
	- id
	- type ("COMMENT", "IDEA" or "OTHER")
	- content
	- service (apiKey)
	- customerEmail?

<!-- ## NPS
	- id
	- service (serviceId)
	- customerEmail?
	- description?
	- rating

### widget
 - 2 tabs
 - 10 stars to fill
 - email input (optional)
 - submit button
 - description textarea (optional)-->

# actions
## user (adm)
	- create a new service
	- delete a service
	- suspend a service

## customer
	- send a feedback via widget

# components
## widget
	- issue, idea and other button
	- description textarea
	- user email input (optional)
	- submit button (enabled only with textarea filed)

## api (routes /api)
	- signup (adm data) POST::/signup [return token(admId)]
	- login (email; password) POST::/login [return token(admId)]

	- create a service (body: serviceData, header: token(admId)) POST::/services/
	- delete a service (body: serviceId, header: token(admId)) DELETE::/services/
	- suspend a service (body: serviceId isActive, header: token(admId)) PATCH::/services/

	- list all services (no-body,  header: token(admId)) GET::/services/
	- list all service's feedbacks (no-body, header: token(admId)) GET::/services/:apiKey/feedbacks/
		(orderBy date; count types, average of types, count all)
	- register a feedback (body: data, header: apiKey) POST::/feedbacks/ 204 [max 20 request per day]
<!-- - list all feedbacks by adm (admId) (orderBy date; count types) -->

## page
### dashboard
	- list all services
	- count of feedbacks (ammount)
	- average of types
	- count types
<!-- - average of NPS feebacks -->

### service page
	- list feedbacks by service
	- feedback's chart

# rules
- all IDs (except apiKey) will be UUIDs
- each service has a maximum of 20 feedbacks request per day
- if the customer send a feedback with email, allow service manager to send a message to this email
<!--  - each service has a maximum of 3 specifics url that can send feedbacks via http (allow CORS for all URLs, create a middleware to interrupt unallowed URL's request) -->

# tools and feats
- rate limit (20 req/day) (see headers) => limit feedbacks by service
- redis
- postgreSQL (typeorm) => tables relationship
- SOLID
- Clean Architecture
- TDD and DDD
- CI and CD (github workflow | travis CI) => automatic deploy on heroku and testing
- GraphQL => reduce overfetch
- custom 404 page
- docker => create all aplication environment toggether
- graceful shutdown => shutdow application correctly
- documentation page (ejs renderized page) => substitute swagger api

# future features
- create a react component, and share it via npm
- create NPS registrations by service (work toggether feedbacks)
- create plans to increase feedbacks limits
- use web sockets to list new feedbacks in real time

# learning...
- project plannig
- ci and ci skils
- sql skills
- docker skills and management
- graphql skills
- clean architecture, SOLID and clean code
- data caching

# tasks
[x] create project on heroku
[x] create project on vercel
[x] organize github repositories
