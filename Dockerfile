FROM node:12.16.3-slim

WORKDIR /code

COPY package.json package-lock.json ./
RUN npm install
