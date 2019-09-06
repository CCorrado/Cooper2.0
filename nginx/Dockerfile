FROM node:latest as build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./frontend/package.json /usr/src/app/
COPY ./frontend/package-lock.json /usr/src/app/

RUN npm install

COPY ./frontend /usr/src/app

RUN npm run build

FROM nginx

ARG NODE_ENV=production

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
