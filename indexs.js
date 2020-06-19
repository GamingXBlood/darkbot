const {
    Client,
    MessageEmbed,
    Attachment,
    MessageReaction,
    GuildMember,
    Message
} = require('discord.js');
const bot = new Client();

const ping = require('minecraft-server-util')

const token = "NzIzMTM2MTk2MjI5ODU3MzQy.XutVgg.ddSongfgTHKIKXgnHoqJuDMQnvw";

const PREFIX = 'p!';

const ytdl = require("ytdl-core");

const usedCommandRecently = new Set();

var servers = {};

const ms = require('ms');

bot.on('ready', () => {
    console.log("Activ");
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
    if (!channel) return;

    channel.send(`🎉 Bine ai venit pe server **${member}**, te rugam sa citesti regulamentul. 🎉`);
});

bot.on('guildMemberRemove', member => {
    const chanel = member.guild.channels.cache.find(chanel => chanel.name === "welcome");
    if (!chanel) return;

    chanel.send(`**${member}** ne-a parasit. Speram sa revii. 😢`);
});

bot.on('message', msg => {
    let args = msg.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'play':

            function play(connection, msg){
                var server = server[msg.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

                server,queue.shift();

                server.dispatcher.on("end", function(){
                    if(server.queue[0]){
                        play(connection, msg);
                    }else {
                        connection.disconnect();
                    }
                });
            }

            if(!args[1]){
                msg.channel.send("Trebuie sa adaugi un link.");
                return;
            }

            if(!msg.member.voice.channel){
                msg.channel.send("Trebuie sa fi intr-un canal voice pentru a putea folosi bot-ul.");
                return;
            }

            if(!servers[msg.guild.id]) servers[msg.guild.id] = {
                queue: []
            }

            var server = servers[msg.guild.id];

            server.queue.push(args[1]);

            if(!msg.member.voice.connection) msg.member.voice.channel.join().then(function(connection){
                play(connection, msg);
            })





        break;
    }


});

bot.login(token);