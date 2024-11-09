FROM node:20-alpine

WORKDIR /react-app

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["npm","start"]
