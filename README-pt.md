<p align="center"> <img src="./.github/assets/logo.svg" width="200" /> </p>
<h1 align="center"> Feedback.io </h1>

#### Muda de Língua
<p>
  <a href="https://github.com/gabriellopes00/feedbackio-api/blob/main/README.md" alt="turn lenguage">
    <img src="./.github/assets/flag-eua.jpg" alt="flag-eua" min-width="50px" max-width="50px" width="50px" alt="turn lenguage portugues">
  </a>
</p>

###### Uma API construída com

<p>
  <img src="https://cdn.svgporn.com/logos/typescript-icon.svg" alt="typescript" width="30" height="30"/>
  <img src="https://cdn.svgporn.com/logos/nodejs-icon.svg" alt="nodejs" width="30" height="30"/>
  <img src="https://cdn.svgporn.com/logos/graphql.svg" alt="graphql" width="30" height="30"/>
  <img src="https://cdn.svgporn.com/logos/socket.io.svg" alt="socket.io" width="30" height="30"/>
  <img src="https://cdn.svgporn.com/logos/docker-icon.svg" alt="docker" width="30" height="30"/>
  <img src="https://cdn.svgporn.com/logos/postgresql.svg" alt="postgresql" width="30" height="30"/>
  <img src="https://cdn.svgporn.com/logos/eslint.svg" alt="eslint" width="30" height="30"/>
  <img src="https://cdn.svgporn.com/logos/jest.svg" alt="jest" height="30">
  <img src="https://cdn.svgporn.com/logos/heroku-icon.svg" alt="heroku" height="30">
  <img src="https://github.com/typeorm/typeorm/raw/master/resources/logo_big.png" alt="typeorm" height="30">
</p>

##### Aplicativo hospedado em: _[heroku](https://www.heroku.com/)_.

##### Url da API: _https://api-feedbackio.herokuapp.com_.

<h2> Sobre Feedback.io 📚 </h2>

<p>
    Feedback.io está sendo construído para oferecer uma plataforma completa para que todos tenham um melhor controle sobre seus serviços e a opinião de seus clientes sobre eles. Aqui você pode se cadastrar na plataforma e criar serviços, que poderão receber feedbacks e taxas de seus clientes. Isso permitirá que você entre em contato com os feedbacks dos clientes, que podem ser PROBLEMAS, IDÉIAS ou OUTROS, e calcule o NPS de seus serviços, sabendo como seus clientes estão avaliando seus serviços. Este é um aplicativo de código aberto, que é construído usando Nodejs, incluindo muitos outros conceitos e novas tecnologias, como Typescript, princípios SOLID, Clean Architecture, DDD, TDD, Docker, PostgreSQL ...  
</p>

## Estrutura da API

![Clean Architecture Schema](.github/assets/clean-architecture.jpg)

Esta estrutura de projeto é inspirada na estrutura de código de arquitetura limpa, [by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). O principal objetivo da arquitetura limpa é criar uma estrutura de projeto forte, dividindo todo o aplicativo em camadas. As melhores vantagens de utilizá-lo, é criar uma aplicação independente de qualquer framework, ferramenta, banco de dados ou tecnologia, sendo fácil manipular o código, criar novas funcionalidades, corrigir qualquer problema, ou alterar algum framework, graças aos adaptadores e portas.

#### Pastas 📚

```
root
├── .github                 - Github setup files
│     └── assets
│     └── workflow
├── assets                  - Project assets (images, logos...)
├── src                     - Application main code
│    │── app                - Composition layer, entry point code
│    │    └── routes        - routes files
│    │    └── setup         - server config (middlewares, cors, body-parser)
│    │    └── builds        - classes instances
│    │    └── adapters      - components adapters
│    ├── config             - Some global config files (.env, path alias, logger)
│    ├── domain             - Business rules definition
│    │     └── entities
│    │     └── usecases
│    ├── infra              - External frameworks and libs implementation
│    ├── presentation       - External api communication layer (controllers, presenters, validators)
│    └── useCases           - Usecases implementation
└─── tests                  - Components tests
      └── e2e
      └── unit
```

## Construindo e contribuindo 🛠

Para executar este projeto localmente, você terá que instalar o Nodejs e o PostgreSQL na máquina ou executar tudo com o Docker. Depois de executar o projeto, vá para o arquivo **_.Env.example_**, na raiz do projeto, e renomeie-o para **_.Env_**, preenchendo todas as propriedades do arquivo com suas informações.



###### Clona Repositório

```git
git clone https://github.com/gabriellopes00/feedbackio-api.git
or
git clone git@github.com:gabriellopes00/feedbackio-api.git
```

###### Rodar no Docker

```docker
docker-compose up
```

###### Executando localmente

```bash
npm install
npm run build
npm run start
```

###### Testes (jest) 🧪

- _**All**_ ❯ `yarn test`
- _**Coverage**_ ❯ `yarn test:ci`
- _**Unit**(.spec)_ ❯ `yarn test:unit`
- _**e2e**(.test)_ ❯ `yarn test:e2e`

###### Linting (eslint and prettier) 🎭

- _**Lint**(eslint)_ ❯ `yarn lint`
- _**Style**(prettier)_ ❯ `yarn style`

###### Estatísticas dos tipos de commits 📊📈

Seguindo o padrão do [Conventional Commits](https://www.conventionalcommits.org/).

- _**feature** commits(amount)_ ❯ `git shortlog -s --grep feat`
- _**test** commits(amount)_ ❯ `git shortlog -s --grep test`
- _**refactor** commits(amount)_ ❯ `git shortlog -s --grep refactor`
- _**chore** commits(amount)_ ❯ `git shortlog -s --grep chore`
- _**docs** commits(amount)_ ❯ `git shortlog -s --grep docs`
- _**build** commits(amount)_ ❯ `git shortlog -s --grep build`

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/69465943?v=4" width="100px;" alt="Foto do Gabriel Lopes no GitHub"/><br>
        <sub>
          <b>Gabriel Lopes</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/69259671?v=4" width="100px;" alt="Foto do Matheus Campos"/><br>
        <sub>
          <b>Matheus Campos</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## Licença ✒

Este projeto usa a licença [Apache 2](https://github.com/gabriellopes00/feedbackio-api/blob/main/LICENSE.md), leia para saber mais sobre permissões e direitos autorais.

## Contato 📱

[![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white&link=https://github.com/gabriellopes00)](https://github.com/gabriellopes00)
[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/gabriel-lopes-6625631b0/)](https://www.linkedin.com/in/gabriel-lopes-6625631b0/)
[![Twitter Badge](https://img.shields.io/badge/-Twitter-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/_gabrielllopes_)](https://twitter.com/_gabrielllopes_)
[![Gmail Badge](https://img.shields.io/badge/-Gmail-D14836?&style=flat-square&logo=Gmail&logoColor=white&link=mailto:gabrielluislopes00@gmail.com)](mailto:gabrielluislopes00@gmail.com)
[![Facebook Badge](https://img.shields.io/badge/facebook-%231877F2.svg?&style=flat-square&logo=facebook&logoColor=white)](https://www.facebook.com/profile.php?id=100034920821684)
[![Instagram Badge](https://img.shields.io/badge/instagram-%23E4405F.svg?&style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/_.gabriellopes/?hl=pt-br)
[![StackOverflow Badge](https://img.shields.io/badge/stack%20overflow-FE7A16?logo=stack-overflow&logoColor=white&style=flat-square)](https://stackoverflow.com/users/14099025/gabriel-lopes?tab=profile)
