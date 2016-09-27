FROM node:6.3
MAINTAINER Sindre Gulseth <sgulseth@gmail.com>

RUN npm install -g roc@1.0.0-rc.10
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/package.json
RUN npm install

ADD . /app

RUN roc build --build-disableProgressbar="true"

EXPOSE 9000

CMD ["npm", "start"]