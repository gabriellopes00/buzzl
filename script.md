# data

## users

    - id
    - name
    - email
    - password

## services

    - id
    - name
    - description?
    - maintainer (userEmail)
    - status (isActive)
    - apiKey (custom_id)

<!-- - allowedURLs  https://dev.mysql.com/doc/refman/5.7/en/json.html -->

## feedbacks

    - id
    - type ("ISSUE", "IDEA" or "OTHER")
    - content
    - service (apiKey)
    - customerEmail?

<!-- ## NPS

    - id
    - service (apiKey)
    - rating [1 - 10]
     -->

# actions

## user

    - create a new service
    - delete a service
    - suspend a service
    - update a service
    - regenerate service apiKey

## client

    - send a feedback via widget
    <!-- - send it's NPS via widget -->

# components

<!-- ## widget -->

<!-- - two tabs (NPS and feedbacks) -->

<!-- - submit button (enabled only with textarea or stars filed) -->
  <!-- (nps) - 10 stars to fill -->
  <!-- (feedbacks) - issue, idea, complaint and other button - description textarea - user email input (optional) -->

## api (routes)

    - list all error logs (header: secret(env.APP_SECRET)) GET::/logs/errors

    - signup (body: userData) POST::/signup [return user data token(userId)]
    - login (body: email; password) POST::/login [return token(userId)]

    - create a service (body: serviceData, header: token(userId)) POST::/services/
    - delete a service (body: apiKey, header: token(userId)) DELETE::/services/
    - update a service (body: newServiceData, header: token(userId)) PUT::/services/
    - suspend a service (body: {apiKey}, header: token(userId)) PATCH::/services/status
    - regenerate apiKey (body: {currentApiKey}, header: token(userId)) PATCH::/services/api_key

    - list all services by user (header: token(userId)) GET::/services/
    - list all service's feedbacks (body: {apiKey} header: token(userId)) GET::/services/feedbacks/
    (orderBy date; count types, percent by types, count all)
    - list all user's feedbacks (body: {userEmail} header: token(userId)) GET::/users/feedbacks/
    (orderBy date; count types, percent by types, count all)

<!-- - list service's NPS (header: token(userId)) GET::/services/:apiKey/nps/
    (orderBy date; count all; detractors; promoters; passives; level[greate, good , regular, bad]; nps) -->

    - register a feedback (body: feedbackData, header: apiKey) POST::/feedbacks/ 204 [max 20 request per day]

<!-- - register a NPS (body: rating[1-10], header: apiKey) POST::/nps/ 204 [max 20 request per day] -->

<!-- - list all feedbacks by adm (userId) (orderBy date; count types) -->

<!-- ## page -->

<!-- ### dashboard -->

<!-- - list all services by user (orderBy date; count types, percent by types, count all) -->

<!-- - average of NPS feebacks -->

<!-- ### service page -->

<!-- - list feedbacks by service -->
<!-- - feedback's chart -->
<!-- - show NPS info (detractors, passive, promoters, general nps, level) (maybe some chart too) -->

# rules

- if a service is not active, lists requests will receive a message like ["this service is temporary disabled"]
- all IDs (except apiKey) will be UUIDs
- each service has a maximum of 20 feedbacks and 20 for NPS request per day
- if the client send a feedback with email, allow service manager to send a message to this email
- if max requests is reached, cache all feedbacks by service, in the first requests, the others will use the cached data
- when a service is updated, is not available update maintainer email, this data is only updated if mainer updates its own email

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
- update user data and recover password
- survey system (when user send its email with feedback, ask "would you like receive emails with surveys ?")
- make returns an error if user try to transfer a service for itself

# learning...

- project planing
- project structure (clean architecture)
- rsa keys (cryptography) and jwt tokens
- sh scripts
- ci and cd skills
- regexp
- sql skills
- docker skills and management
- graphql skills
- clean architecture, SOLID and clean code
- data caching
- decorator

# tasks

[x] create project on heroku
[x] create project on vercel
[x] organize github repositories
[x] create docker environment
[x] create domain data
[x] develop login and signup api
[x] configure api server
[] start ci and cd

# fixtures

```js
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// const ID = () => '\_' + Math.random().toString(36).substr(2, 12).toLowerCase()

function asdf() {
const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz'
const len = 11
let rtn = '\_'
for (let i = 0; i < len; i++) rtn += ALPHABET.charAt(Math.floor(Math.random() \* ALPHABET.length))
return rtn
}

const pattern = /^\_[a-z0-9]{11}$/i
for (let index = 0; index < 599; index++) if (!pattern.test(asdf())) console.log('failed')

// const pattern = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9a-f]{3}-[89AB][0-9a-f]{3}-[0-9A-F]{12}$/i
// console.log(pattern.test('fa99c520-352a-4b8f-9f13-754a1da8ab3c'))
```

```ts
import { appendFile } from 'fs'

interface ResponseHttp {
  code: number
  body: Error
}

interface Controller {
  handle(request: any): Promise<ResponseHttp>
}

class Logger {
  public async log(payload: Error): Promise<void> {
    return await new Promise((resolve, rejects) => {
      appendFile('./logs.txt', `${payload.stack} \n`, () => console.log('payload stored'))
    })
  }
}

function logger() {
  return (target: Object, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = async function (...args) {
      const result: ResponseHttp = await originalMethod.apply(this, args)
      if (result.body) {
        const log = new Logger()
        log.log(result.body)
        console.log(result.body.stack + 'from decorator')
      }
      return result
    }
  }
}

class ExampleController implements Controller {
  public async handle(request: any): Promise<ResponseHttp> {
    try {
      console.log('controller handle called')
      throw new Error('new test decorator log Errors')
      return { code: 200, body: request }
    } catch (error) {
      console.log(error + 'from controller')
      return { code: 500, body: error }
    }
  }
}

;(async () => {
  const controller = new ExampleController()
  const response = await controller.handle('payload')
})()
```

```html
<table cellpadding="1" cellspacing="1">
  <tr>
    <th>email</th>
    <th>name</th>
  </tr>
  <tr>
    <td>lorem.eget@maurisMorbi.com</td>
    <td>Dai Mccray</td>
  </tr>
  <tr>
    <td>amet.ante@erat.co.uk</td>
    <td>Clio Lester</td>
  </tr>
  <tr>
    <td>ligula.elit.pretium@ipsumportaelit.ca</td>
    <td>Vernon Petty</td>
  </tr>
  <tr>
    <td>nisi.dictum.augue@ultricies.net</td>
    <td>Garrison Daniel</td>
  </tr>
  <tr>
    <td>mauris@asollicitudinorci.edu</td>
    <td>Alisa Mejia</td>
  </tr>
  <tr>
    <td>eu@orci.com</td>
    <td>Brendan Mcfadden</td>
  </tr>
  <tr>
    <td>ut.nulla.Cras@natoque.edu</td>
    <td>Brenden Turner</td>
  </tr>
  <tr>
    <td>magna@faucibusleo.edu</td>
    <td>Gregory Sparks</td>
  </tr>
  <tr>
    <td>blandit.Nam@feugiat.edu</td>
    <td>Pandora Noel</td>
  </tr>
  <tr>
    <td>ligula.Aenean.euismod@mipedenonummy.edu</td>
    <td>Joseph Carey</td>
  </tr>
  <tr>
    <td>senectus.et.netus@orciquislectus.edu</td>
    <td>Aurelia Lynch</td>
  </tr>
  <tr>
    <td>ullamcorper@maurisMorbinon.co.uk</td>
    <td>Nyssa Hutchinson</td>
  </tr>
  <tr>
    <td>netus@laciniaSed.net</td>
    <td>Colin Fisher</td>
  </tr>
  <tr>
    <td>Cras.dictum.ultricies@tinciduntorciquis.ca</td>
    <td>Kevin Leonard</td>
  </tr>
  <tr>
    <td>velit.dui.semper@convallisdolor.edu</td>
    <td>Deacon Valencia</td>
  </tr>
  <tr>
    <td>consequat@lectusquismassa.ca</td>
    <td>Harlan Ochoa</td>
  </tr>
  <tr>
    <td>purus.sapien.gravida@vitaepurus.org</td>
    <td>Kitra Shelton</td>
  </tr>
  <tr>
    <td>molestie@Lorem.co.uk</td>
    <td>Griffin Simon</td>
  </tr>
  <tr>
    <td>gravida.non.sollicitudin@metus.org</td>
    <td>Stella Castillo</td>
  </tr>
  <tr>
    <td>nisl@nec.org</td>
    <td>Dolan Wood</td>
  </tr>
  <tr>
    <td>Nunc.mauris@volutpatNulladignissim.org</td>
    <td>Kiara Christensen</td>
  </tr>
  <tr>
    <td>diam.luctus.lobortis@laoreetlectusquis.net</td>
    <td>Nell Freeman</td>
  </tr>
  <tr>
    <td>feugiat.non@idenim.org</td>
    <td>Mary Pittman</td>
  </tr>
  <tr>
    <td>lobortis.ultrices.Vivamus@idsapien.org</td>
    <td>Tamara Madden</td>
  </tr>
  <tr>
    <td>id@Phasellus.edu</td>
    <td>Odette Dillon</td>
  </tr>
  <tr>
    <td>mus.Proin.vel@nuncrisus.ca</td>
    <td>Ishmael Wilcox</td>
  </tr>
  <tr>
    <td>volutpat.ornare.facilisis@utsemNulla.ca</td>
    <td>Elliott Leach</td>
  </tr>
  <tr>
    <td>diam@Utnec.net</td>
    <td>Jeanette Reilly</td>
  </tr>
  <tr>
    <td>torquent@enim.org</td>
    <td>Dante Mathews</td>
  </tr>
  <tr>
    <td>In.condimentum.Donec@eros.com</td>
    <td>Shafira Carey</td>
  </tr>
  <tr>
    <td>eu.dolor.egestas@erat.com</td>
    <td>Francis Ellis</td>
  </tr>
  <tr>
    <td>nulla@ametrisusDonec.edu</td>
    <td>Gareth Everett</td>
  </tr>
  <tr>
    <td>felis@orci.co.uk</td>
    <td>Ralph Delaney</td>
  </tr>
  <tr>
    <td>pellentesque.a.facilisis@nonummy.com</td>
    <td>Griffith Frost</td>
  </tr>
  <tr>
    <td>Curabitur.vel.lectus@Donectempor.edu</td>
    <td>Quentin Stout</td>
  </tr>
  <tr>
    <td>Quisque.tincidunt@rhoncusNullam.net</td>
    <td>McKenzie Rosario</td>
  </tr>
  <tr>
    <td>tellus.justo@elementumat.net</td>
    <td>Darius Wells</td>
  </tr>
  <tr>
    <td>sed.tortor@ultricesposuere.com</td>
    <td>Valentine Dawson</td>
  </tr>
  <tr>
    <td>tortor.nibh@tortor.net</td>
    <td>David Walters</td>
  </tr>
  <tr>
    <td>sodales.nisi.magna@molestie.ca</td>
    <td>Kermit Jensen</td>
  </tr>
  <tr>
    <td>sed@eunulla.com</td>
    <td>Dorothy Bradley</td>
  </tr>
  <tr>
    <td>pede@molestie.ca</td>
    <td>Kaden Lewis</td>
  </tr>
  <tr>
    <td>dolor@dolordapibusgravida.edu</td>
    <td>Axel Kinney</td>
  </tr>
  <tr>
    <td>Aliquam.nec.enim@vitae.edu</td>
    <td>Bruce Lynn</td>
  </tr>
  <tr>
    <td>Phasellus.libero@viverra.co.uk</td>
    <td>Carter Buck</td>
  </tr>
  <tr>
    <td>aliquet@Nunccommodo.net</td>
    <td>Claudia Underwood</td>
  </tr>
  <tr>
    <td>quis.diam.Pellentesque@justo.com</td>
    <td>Marcia Mcgee</td>
  </tr>
  <tr>
    <td>nisi.dictum.augue@nequeIn.edu</td>
    <td>Breanna French</td>
  </tr>
  <tr>
    <td>Donec.felis@sociisnatoque.ca</td>
    <td>Murphy Mcleod</td>
  </tr>
  <tr>
    <td>blandit.congue@imperdietornare.edu</td>
    <td>David Hurst</td>
  </tr>
  <tr>
    <td>ipsum.primis.in@non.org</td>
    <td>Ruby Harris</td>
  </tr>
  <tr>
    <td>sed@acarcuNunc.ca</td>
    <td>Barclay Horton</td>
  </tr>
  <tr>
    <td>nunc@ligula.com</td>
    <td>Ferdinand Valentine</td>
  </tr>
  <tr>
    <td>tincidunt.aliquam.arcu@augue.com</td>
    <td>Arden Raymond</td>
  </tr>
  <tr>
    <td>Nulla@convallis.co.uk</td>
    <td>Chantale Everett</td>
  </tr>
  <tr>
    <td>lobortis@quisturpis.com</td>
    <td>Kai Norris</td>
  </tr>
  <tr>
    <td>auctor@anteiaculisnec.ca</td>
    <td>Joel Christian</td>
  </tr>
  <tr>
    <td>id.blandit.at@Nullaaliquet.co.uk</td>
    <td>Kirk Briggs</td>
  </tr>
  <tr>
    <td>molestie.sodales@quisdiam.net</td>
    <td>Cassady Frye</td>
  </tr>
  <tr>
    <td>gravida.nunc@estMauris.com</td>
    <td>Sandra Perkins</td>
  </tr>
  <tr>
    <td>in.sodales@orcilobortis.edu</td>
    <td>Keegan Gill</td>
  </tr>
  <tr>
    <td>facilisis.magna@urna.com</td>
    <td>Fleur Cook</td>
  </tr>
  <tr>
    <td>tempor.bibendum@nequeInornare.co.uk</td>
    <td>Hannah Mcintyre</td>
  </tr>
  <tr>
    <td>quis.accumsan.convallis@Crasdolordolor.net</td>
    <td>Aurelia Delgado</td>
  </tr>
  <tr>
    <td>tempor@Namac.org</td>
    <td>Rafael Caldwell</td>
  </tr>
  <tr>
    <td>mi.eleifend@Nullamvelit.net</td>
    <td>Zenaida Carlson</td>
  </tr>
  <tr>
    <td>imperdiet.ullamcorper@semPellentesqueut.ca</td>
    <td>Phoebe Weeks</td>
  </tr>
  <tr>
    <td>mauris.Morbi.non@congueaaliquet.net</td>
    <td>Carter Cote</td>
  </tr>
  <tr>
    <td>sem.Nulla@at.edu</td>
    <td>Tanek Maddox</td>
  </tr>
  <tr>
    <td>tellus.Aenean@Duismi.co.uk</td>
    <td>Lev Mueller</td>
  </tr>
  <tr>
    <td>euismod.in.dolor@nonjustoProin.net</td>
    <td>Allen Hays</td>
  </tr>
  <tr>
    <td>ut@natoquepenatibus.ca</td>
    <td>Tanek Molina</td>
  </tr>
  <tr>
    <td>nibh.Aliquam.ornare@aliquamenim.org</td>
    <td>Cyrus Craft</td>
  </tr>
  <tr>
    <td>Proin.non.massa@Nullamut.com</td>
    <td>Lee Moore</td>
  </tr>
  <tr>
    <td>vel.convallis.in@Nullamlobortis.com</td>
    <td>Zane Glenn</td>
  </tr>
  <tr>
    <td>id.ante.Nunc@dolorsitamet.co.uk</td>
    <td>Cairo Pierce</td>
  </tr>
  <tr>
    <td>tincidunt.adipiscing.Mauris@ipsum.co.uk</td>
    <td>Nehru Franks</td>
  </tr>
  <tr>
    <td>Aliquam@Utsemper.ca</td>
    <td>Elijah Lee</td>
  </tr>
  <tr>
    <td>euismod.ac.fermentum@arcuSedeu.net</td>
    <td>Pandora Ferguson</td>
  </tr>
  <tr>
    <td>luctus@molestie.ca</td>
    <td>Nadine Mcintyre</td>
  </tr>
  <tr>
    <td>bibendum.sed.est@Aeneanegetmetus.edu</td>
    <td>Destiny Henry</td>
  </tr>
  <tr>
    <td>vulputate@a.edu</td>
    <td>Kenneth Randolph</td>
  </tr>
  <tr>
    <td>dolor.nonummy@nuncrisus.edu</td>
    <td>Miriam Barr</td>
  </tr>
  <tr>
    <td>sit.amet@vestibulum.com</td>
    <td>Jana Woodard</td>
  </tr>
  <tr>
    <td>sit.amet@magnaPraesentinterdum.org</td>
    <td>Vivien Curtis</td>
  </tr>
  <tr>
    <td>eget.ipsum.Suspendisse@Etiam.com</td>
    <td>Macaulay Sargent</td>
  </tr>
  <tr>
    <td>auctor.nunc@necenimNunc.ca</td>
    <td>Drew Gallegos</td>
  </tr>
  <tr>
    <td>nonummy.Fusce@ametmetusAliquam.org</td>
    <td>Theodore Berry</td>
  </tr>
  <tr>
    <td>quis.accumsan@gravidaPraesent.edu</td>
    <td>Nelle Conner</td>
  </tr>
  <tr>
    <td>ornare.tortor@amet.net</td>
    <td>Athena Mcbride</td>
  </tr>
  <tr>
    <td>dapibus@nonummyac.org</td>
    <td>Hall Hunter</td>
  </tr>
  <tr>
    <td>elementum.purus@fermentumfermentum.com</td>
    <td>Isaiah Galloway</td>
  </tr>
  <tr>
    <td>ultrices.sit@molestie.co.uk</td>
    <td>Silas Flores</td>
  </tr>
  <tr>
    <td>enim.Mauris@semper.edu</td>
    <td>Heather Nieves</td>
  </tr>
  <tr>
    <td>ridiculus@laoreetipsumCurabitur.net</td>
    <td>Steven Bryan</td>
  </tr>
  <tr>
    <td>id@montesnascetur.org</td>
    <td>Wylie Stephenson</td>
  </tr>
  <tr>
    <td>urna.et@sociosquad.com</td>
    <td>Harper Charles</td>
  </tr>
  <tr>
    <td>Nunc.commodo@malesuada.com</td>
    <td>Stacey Mason</td>
  </tr>
  <tr>
    <td>malesuada.fames.ac@Nullafacilisi.edu</td>
    <td>Roth Barr</td>
  </tr>
  <tr>
    <td>et@ut.ca</td>
    <td>Ava Weber</td>
  </tr>
</table>
```
