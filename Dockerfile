FROM node:12-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY entrypoint.sh /entrypoint.sh
EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]