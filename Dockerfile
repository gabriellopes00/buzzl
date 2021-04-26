FROM node:14
WORKDIR /usr/src/feedbackio/

LABEL manteiner="gabrielluislopes00@gmail.com"
LABEL version="0.0.1"
LABEL description="Feedback.io api docker image"
LABEL url="https://api-feedbackio.herokuapp.com"

COPY package*.json .
RUN npm install --production

COPY . .

EXPOSE 7719

ENTRYPOINT npm run orm migration:run && npm start
