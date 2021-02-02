FROM node:15.7.0-alpine3.10

WORKDIR /usr/src/app

COPY . .
# COPY package*.json ./

RUN npm install


EXPOSE 5000
# CMD [ "node", "index.js" ]
CMD [ "npm", "start" ]