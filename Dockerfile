FROM node:lts-alpine AS dev_dependencies
WORKDIR /usr/src/buzzl/
COPY package.json yarn.* tsconfig.json ./
COPY ./src ./src
RUN yarn install --production=false --frozen-lockfile

FROM node:lts-alpine AS dependencies
WORKDIR /usr/src/buzzl/
COPY package.json yarn.* ./
COPY ./src ./src
RUN yarn install --production=true --frozen-lockfile

FROM node:lts-alpine AS build
WORKDIR /usr/src/buzzl/
COPY --from=dev_dependencies /usr/src/buzzl/ .
COPY . .
RUN yarn build

FROM node:lts-alpine AS runtime
USER node
ENV PATH /usr/src/buzzl/node_modules/.bin:$PATH
ENV NODE_ENV=production
COPY --chown=node:node --from=dependencies /app/node_modules /home/node/app/node_modules/
COPY --from=build --chown=node:node /app/dist /home/node/app/dist/
COPY --from=build --chown=node:node /app/scripts /home/node/app/scripts/
COPY --from=build --chown=node:node /app/prisma /home/node/app/prisma/
EXPOSE 7719
ENTRYPOINT yarn orm migration:run && npm start
