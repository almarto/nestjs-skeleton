FROM mhart/alpine-node:11.8.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN yarn install

COPY . /usr/src/app

# Run Sass watcher for Chrome
CMD [ "yarn", "start:dev" ]