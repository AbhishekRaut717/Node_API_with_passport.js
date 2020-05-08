# Dockerfile

FROM node:10
# Create Work dir inside the image where appliation code will be held
WORKDIR /node_bank_app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 3000
CMD [ "node", "start" ]