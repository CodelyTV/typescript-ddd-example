FROM node:12.16.3-slim as builder

WORKDIR /code

COPY package.json package-lock.json ./
RUN npm install
