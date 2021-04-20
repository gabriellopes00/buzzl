FROM node:14
WORKDIR /usr/src/feedbackio/

LABEL manteiner="gabriellopes"
LABEL version="0.0.1"
LABEL description="Feedback.io api docker image"

COPY package*.json .
RUN npm install --production

COPY ormconfig.js .
COPY .env .
COPY assets/ ./assets/
COPY dist/ ./dist/

EXPOSE 7719

ENTRYPOINT npm run orm migration:run && npm start
