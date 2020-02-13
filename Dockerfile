FROM node:12.16.0-alpine3.11
WORKDIR /app

COPY . .

EXPOSE 8080
CMD [ "node", "dist/src/apps/mooc_backend/server" ]
