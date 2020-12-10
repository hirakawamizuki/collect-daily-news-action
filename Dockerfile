FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN ls
RUN ls node_modules/axios
RUN npm bin -g
RUN npm bin
COPY entrypoint.sh /entrypoint.sh
RUN ls
EXPOSE 8080
ENTRYPOINT ["/entrypoint.sh"]