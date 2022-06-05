FROM node:latest

WORKDIR /microservice-constructor-back

COPY package.json ./

RUN npm install

RUN npm run build

CMD npm run start:prod
