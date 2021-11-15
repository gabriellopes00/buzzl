FROM node:16-alpine3.13
WORKDIR /usr/src/buzzl/

ENV PATH /usr/src/buzzl/node_modules/.bin:$PATH
ENV NODE_ENV=production

COPY package.json .
COPY yarn.lock .
RUN yarn add --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 7719

ENTRYPOINT yarn orm migration:run && npm start
