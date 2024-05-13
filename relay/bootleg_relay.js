const Discord = require("../src/exports.js");
const client = new Discord.Client("Token goes here :)");

// Used to know how many minutes has passed
const startDate = Date.now();

//#######Config of the relay########

const channel1 = "";
const channel2 = "";



function sendmessage(channelid,content){
    client.send(channelid, {
        content: `${content}`
    });
}


client.on.ready = function () {
    console.log("Relay booted up!");
    sendmessage(channel1,"Bootleg relay started")
    sendmessage(channel2,"Bootleg relay started")
   
};
client.on.message_create = function (message) {
    // Get the guild and channel it was sent in
    const guild = client.info.guilds.filter((guild) => guild.id == message.guild_id)[0];
    const channel = guild.channels.filter((channel) => channel.id == message.channel_id)[0];

    // Calculate the amount of minutes passed since this program started
    const minutesPassed = ((Date.now() - startDate) / 1000 / 60).toFixed(2);

    if(channel.id == channel1 & message.author.id != client.info.user.id){
        console.log(`(${minutesPassed}m) Message sent in Channel 1:  [${guild.name}] [#${channel.name}] ${message.author.username}: ${message.content}`)
        if(message.content.slice(0,17) == "https://tenor.com"){
            sendmessage(channel2,`\`\`${message.author.username}:\`\` [Tenor Embeded](${message.content})`);
        } else{
            sendmessage(channel2,`\`\`${message.author.username}:\`\` ${message.content}`);
        }
    }
    if(channel.id == channel2 & message.author.id != client.info.user.id){
        console.log(`(${minutesPassed}m) Message sent in Channel 2:  [${guild.name}] [#${channel.name}] ${message.author.username}: ${message.content}`)

        if(message.content.slice(0,17) == "https://tenor.com"){
            sendmessage(channel1,`\`\`${message.author.username}:\`\` [Tenor Embeded](${message.content})`);
        } else{
            sendmessage(channel1,`\`\`${message.author.username}:\`\` ${message.content}`);
        }
    }
        
};
client.on.reply = function (message) {

    console.log(`Got a reply: ${message.content} `)

};

