FROM node:14-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN ls
RUN ls node_modules/axios
RUN npm bin -g
EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]