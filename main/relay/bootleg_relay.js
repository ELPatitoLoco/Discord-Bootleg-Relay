const Discord = require("../src/exports.js");
const client = new Discord.Client(process.env.token);

// Used to know how many minutes has passed
const startDate = Date.now();

//#######Config of the relay########

const channel1 = process.env.channel1;
const channel2 = process.env.channel2;

const guild1 = process.env.guild1;
const guild2 = process.env.guild2;

//Argument errors
if (process.env.token.length < 4) {
    console.log("Error!");
    throw "Missing token";
}

else if (channel1.length < 4 || channel2.length < 4) {
    console.log("Error!");
    throw "Missing arguments on channel id";
}

else if (guild1.length < 4 || guild2.length < 4) {
    console.log("Error!");
    throw "Missing arguments on guild id";
}



//Functions used to simplify the code
function sendmessage(channelid, content, reply) {
    client.send(channelid, {
        content: `${content}`,
        reply: reply
    });
}

function bridgemessage(message, channel, guild) {
    const minutesPassed = ((Date.now() - startDate) / 1000 / 60).toFixed(2);

    if (channel.id == channel1) { currentchannel = [channel2, channel1] } else if (channel.id == channel2) { currentchannel = [channel1, channel2] }


    if (message.author.id != client.info.user.id) {
        console.log(`(${minutesPassed}m) Message sent in ${channel.name}:  [${guild.name}] [#${channel.name}] ${message.author.username}: ${message.content}`)

        if (message.content.slice(0, 17) == "https://tenor.com") {
            sendmessage(currentchannel[0], `\`\`${message.author.username}:\`\` [Tenor Embeded](${message.content})`, null);//Tenor Gif to Message 
        }
        else if (message.content.includes("<@", 0) && message.content[message.content.indexOf("<") + 20] == ">" || message.content.includes("@everyone") || message.content.includes("@here") || message.content.includes("<@&")) {
            console.warn("Warning: Supresing mention") //Mentions will not be bridged, if any does they wont work
        }
        else {
            sendmessage(currentchannel[0], `\`\`${message.author.username}:\`\` ${message.content}`, null); //Normal message
        }
    }

}

//Discord events
client.on.ready = function () {
    console.log("Relay booted up!");
    console.log(`Channel 1 was set to ${channel1}`)
    console.log(`Channel 2 was set to ${channel2}`)
    sendmessage(channel1, "Bootleg relay started", null)
    sendmessage(channel2, "Bootleg relay started", null)

};

client.on.message_create = function (message) {
    // Get the guild and channel it was sent in
    const guild = client.info.guilds.filter((guild) => guild.id == message.guild_id)[0];
    const channel = guild.channels.filter((channel) => channel.id == message.channel_id)[0];

    // Calculate the amount of minutes passed since this program started
    const minutesPassed = ((Date.now() - startDate) / 1000 / 60).toFixed(2);

    if (channel.id == channel1 || channel.id == channel2) {
        bridgemessage(message, channel, guild);
    }


};

client.on.reply = function (message) {

    // Get the guild and channel it was sent in
    const guild = client.info.guilds.filter((guild) => guild.id == message.guild_id)[0];
    const channel = guild.channels.filter((channel) => channel.id == message.channel_id)[0];

    // Calculate the amount of minutes passed since this program started
    const minutesPassed = ((Date.now() - startDate) / 1000 / 60).toFixed(2);

    if (channel.id == channel1 || channel.id == channel2) {
        bridgemessage(message, channel, guild);
    }

};

//If the account is timed out warn in the other channel
client.on.guild_member_update = function (message) {
    console.log(message)
    if (message.communication_disabled_until != null & message.user.id == client.info.user.id) {
        console.log("The bot has been timed out")
        console.log(message.communication_disabled_until);
        console.log(message.guild_id)   //Added for testing
        console.log(guild1)
        console.log(message.guild_id == guild1)

            if(message.guild_id == guild1){
            sendmessage(channel1, "**The bot has been timed out in one of the channels**", null)
            }
            if(message.guild_id == guild2){
            sendmessage(channel2, "**The bot has been timed out in one of the channels**", null)
            }
    }

};
