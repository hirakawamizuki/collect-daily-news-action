FROM node:12-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8080
ENTRYPOINT ["./entrypoint.sh"]