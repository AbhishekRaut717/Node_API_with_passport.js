FROM node:7
WORKDIR /app
COPY package.json /node_bank
RUN npm install
COPY . /node_bank
CMD node app.js
EXPOSE 3000
