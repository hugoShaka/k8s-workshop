FROM node:12-alpine

RUN mkdir -p /app /uploads
WORKDIR /app
COPY . .

RUN npm install
EXPOSE 8080

CMD ["npm", "run", "start"]

