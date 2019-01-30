FROM mhart/alpine-node:11.8.0
ADD . /app
WORKDIR /app
RUN yarn install
CMD yarn start:prod