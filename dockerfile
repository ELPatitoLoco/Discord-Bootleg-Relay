FROM node:alpine

WORKDIR /home/

COPY main/ /home/

EXPOSE 80

ENV channel1 = ""
ENV channel2 = ""
ENV token = ""

run echo "Channels have been set to $channel1 for channel 1 and $channel2 for channel 2"
run echo "Token has been set to $token"
CMD [ "node", "relay/bootleg_relay.js"]
