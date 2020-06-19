const {
    Client,
    MessageEmbed,
    MessageReaction
} = require('discord.js');
const bot = new Client();

const token = "NzIzMTM2MTk2MjI5ODU3MzQy.XutVgg.ddSongfgTHKIKXgnHoqJuDMQnvw";

const PREFIX = '!';

const usedCommandRecently = new Set();

const ms = require('ms');

bot.on('ready', () => {
    console.log("Activ");
});

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'ping':
            if(!message.member.roles.cache.find(r => r.name === "Creator")) return message.channel.send('Nu ai permisiunile necesare.')
            message.reply('pong!')


        break;
        case 'cooldown':
            if(usedCommandRecently.has(msg.author.id))
        break;

    }

})

bot.login(token);