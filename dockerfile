FROM node:alpine
COPY main home

EXPOSE 80

RUN node install ws

CMD ["node","bootleg_relay.js"]
