const Discord = require("../src/exports.js");
const client = new Discord.Client("Token goes here");

// Used to know how many minutes has passed
const startDate = Date.now();

//#######Config of the relay########

const channel1 = "";
const channel2 = "";



function sendmessage(channelid,content,reply){
    client.send(channelid, {
        content: `${content}`,
        reply: reply
    });
}

function bridgemessage(message,channel,guild){
    const minutesPassed = ((Date.now() - startDate) / 1000 / 60).toFixed(2);

     if(channel.id == channel1){currentchannel = [channel2,channel1]}else if (channel.id == channel2) {currentchannel = [channel1,channel2]}


    if(message.author.id != client.info.user.id){
        console.log(`(${minutesPassed}m) Message sent in ${channel.name}:  [${guild.name}] [#${channel.name}] ${message.author.username}: ${message.content}`)
            
            if(message.content.slice(0,17) == "https://tenor.com"){
                sendmessage(currentchannel[0],`\`\`${message.author.username}:\`\` [Tenor Embeded](${message.content})`,null);//Tenor Gif to Message 
            } 
                else if(message.content.includes("<@",0) && message.content[message.content.indexOf("<") + 20] == ">" || message.content.includes("@everyone") || message.content.includes("@here") || message.content.includes("<@&")){
                    /*sendmessage(currentchannel[1],"**You can't use mentions in a relayed message**",message.id) //If a member makes a mention it wont relay and instead warn the user
                                                                                                                //This is not great and should be replaced by either not relaying the message at all
                                                                                                                //Or just replacing the mentions wiht no text wich is a bit tideous but best practice
                    */                                                                                            
                    console.warn("Warning: Supresing mention")
            }
                    else{
                        sendmessage(currentchannel[0],`\`\`${message.author.username}:\`\` ${message.content}`,null); //Normal message
            }
    }

}



client.on.ready = function () {
    console.log("Relay booted up!");
    sendmessage(channel1,"Bootleg relay started",null)
    sendmessage(channel2,"Bootleg relay started",null)
   
};

client.on.message_create = function (message) {
    // Get the guild and channel it was sent in
    const guild = client.info.guilds.filter((guild) => guild.id == message.guild_id)[0];
    const channel = guild.channels.filter((channel) => channel.id == message.channel_id)[0];

    // Calculate the amount of minutes passed since this program started
    const minutesPassed = ((Date.now() - startDate) / 1000 / 60).toFixed(2);

    if(channel.id == channel1 || channel.id == channel2){
        bridgemessage(message,channel,guild);
    }    
    
        
};

