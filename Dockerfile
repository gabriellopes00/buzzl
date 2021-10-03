FROM node:14
WORKDIR /usr/src/feedbackio/

ENV PATH /usr/src/feedbackio/node_modules/.bin:$PATH
ENV NODE_ENV=production

LABEL manteiner="gabrielluislopes00@gmail.com"
LABEL version="2.0.0"
LABEL url="https://api-feedbackio.herokuapp.com"
LABEL documentation="https://api-feedbackio.herokuapp.com/docs"

COPY package.json .
COPY yarn.lock .
RUN yarn add --frozen-lockfile

COPY . .
RUN yarn build

EXPOSE 7719

ENTRYPOINT yarn orm migration:run && npm start
