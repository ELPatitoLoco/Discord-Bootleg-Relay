FROM node:16
COPY DISCORD-BOOTLEG-RELAY /usr/home

EXPOSE 80

CMD [ "node ","bootleg_relay.js"]