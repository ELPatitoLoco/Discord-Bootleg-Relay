FROM node:16
COPY main /usr/home

EXPOSE 80

RUN npm install ws

CMD ["node","bootleg_relay.js"]