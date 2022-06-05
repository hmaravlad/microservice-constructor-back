FROM node:14-alpine

WORKDIR /microservice-constructor-back

COPY ./ ./

RUN npm install

RUN npm run build

CMD npm run start:prod
