FROM node:14
WORKDIR /usr/src/feedbackio/

LABEL manteiner="gabrielluislopes00@gmail.com" version="2.0.0" description="Feedback.io api docker image" url="https://api-feedbackio.herokuapp.com" documentation="https://api-feedbackio.herokuapp.com/docs"

COPY . .
RUN npm install --production --frozen-lockfile

EXPOSE 7719

ENTRYPOINT npm run orm migration:run && npm start
