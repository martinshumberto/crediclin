FROM node:alpine

WORKDIR /usr/app
COPY package*.json ./
RUN yarn --silent --progress=false
USER root
COPY . .

RUN yarn build

RUN chown -R node:node ./*

RUN apk update && apk add tzdata &&\ 
    cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime &&\ 
    echo "America/Sao_Paulo" > /etc/timezone &&\ 
    apk del tzdata && rm -rf /var/cache/apk/*

USER node

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]