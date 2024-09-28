FROM node:18-alpine

WORKDIR /riskapp

RUN npm install -g expo-cli

COPY packges*.json ./riskapp

RUN npm install

COPY . .

EXPOSE 19000

EXPOSE 19001

CMD ["expo", "start", "--tunnel"]
