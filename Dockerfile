FROM node:14
WORKDIR /usr/src/feedbackio/

LABEL manteiner="gabrielluislopes00@gmail.com" version="0.0.1" description="Feedback.io api docker image" url="https://api-feedbackio.herokuapp.com"

COPY package.json .
RUN npm install --production

COPY . .

EXPOSE 7719

ENTRYPOINT npm run orm migration:run && npm start
