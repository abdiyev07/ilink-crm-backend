FROM node:16.18.1-alpine3.15 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
RUN apk add --no-cache git

COPY package.json *package-lock.json *.npmrc ./
RUN npm install
COPY . .
RUN npm run build

#FROM node:14.18.1-alpine3.12 as development
#
#WORKDIR /usr/src/app
#
#COPY . .
#
#RUN npm ci --only=development
#
#RUN npm ci rimraf
#
#
#
#FROM node:14.18.1-alpine3.12 as production
#
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}
#
#WORKDIR /usr/src/app
#
#COPY package*.json ./
#
#RUN npm ci
#
#COPY --from=development /usr/src/app/dist ./dist