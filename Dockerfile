FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN ls
RUN ls node_modules
RUN ls node_modules/axios
COPY . .
EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]