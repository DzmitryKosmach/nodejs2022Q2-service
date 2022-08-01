FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4000

EXPOSE 8080

CMD ["npm", "run", "start:dev"]