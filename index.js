const {
    Client,
    MessageEmbed,
    Attachment,
    MessageReaction
} = require('discord.js');
const bot = new Client();

const ping = require('minecraft-server-util')

const ytdl = require("ytdl-core");

const PREFIX = '!';

const usedCommandRecently = new Set();

const ms = require('ms');

var version = '1.0.1';

var autor = 'DarkCraft#7854';

var servers = {};

var ci = 'Comanda invalida!';

var site = '**https://darkcraft.ro**';

bot.on('ready', () => {
    console.log('DarkBot Online!');
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
    if (!channel) return;

    channel.send(`Bine ai venit pe server ${member}, te rugam sa citesti regulamentul.`);
});

bot.on('guildMemberRemove', member => {
    const chanel = member.guild.channels.cache.find(chanel => chanel.name === "welcome");
    if (!chanel) return;

    chanel.send(`${member} ne-a parasit. Speram sa revii. :(`);
});

bot.on('message', msg => {

    let args = msg.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'ping':
            msg.channel.send('Ping-ul meu este ' + Client.ws + ' ms.');
            break;
        case 'site':
            msg.channel.send('Site-ul nostru: ' + site);
            break;
        case 'autor':
            msg.channel.send(autor);
            break;
        case 'clear':
            if (!args[1]) return msg.channel.send('Eroare, alege un numar pentru a sterge :).')
            if (!msg.member.roles.cache.find(r => r.name === "Creator")) return msg.channel.send('Nu ai permisiunile necesare.')
                .then(msg => msg.delete(1000))
            msg.channel.bulkDelete(args[1]);
            break;
        case 'avatar':
            msg.reply(msg.author.displayAvatarURL());
            break;
        case 'server':
            const embed = new MessageEmbed()
                .setTitle('Informatii Server')
                .setColor(0xF92929)
                .addField('Nume: ', msg.guild.name)
                .addField('Versiune bot: ', version)
                .setThumbnail(msg.guild.displayAvatarURL)
                .setFooter('Pentru ajutor scrie comanda: !help - Bot creat de: DarkCraft#7854')
            msg.channel.send(embed);
            break;
        case "poll":
            const Embed = new Discord.MessageEmbed()
                .setColor(0xFFC300)
                .setTitle("Cum sa faci un poll?")
                .setDescription(".poll intrebare");

            if (!args[1]) {
                msg.channel.send(Embed)
                break;
            }
            if (!msg.member.roles.cache.find(r => r.name === "Creator")) return msg.channel.send('Nu ai permisiunile necesare.')
                .then(msg => msg.delete(1000))

            let msgArgs = args.slice(1).join(" ");

            msg.channel.send("📋" + "**" + msgArgs + "**").then(MessageReaction => {
                MessageReaction.react("👍");
                MessageReaction.react("👎");
                msg.delete({
                    timeout: 1000
                }).catch(console.error);
            })

            break;
        case 'mute':
            let person = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[1]))
            if (!person) return msg.reply("Nu am putut gasi acel utilizator.");
            if (!msg.member.roles.cache.find(r => r.name === "Creator")) return msg.channel.send('Nu ai permisiunile necesare.')

            let mainrole = msg.guild.roles.cache.find(role => role.name === "Member");
            let muterole = msg.guild.roles.cache.find(role => role.name === "Muted");

            if (!muterole) return msg.reply("Gradul 'Muted' nu exista.")

            let time = args[2];

            if (!time) {
                return msg.reply("Trebuie sa specifici timpul.");

            }

            person.roles.remove(mainrole.id);
            person.roles.add(muterole.id);

            msg.channel.send(`@${person.user.tag} a primit mute pentru ${ms(ms(time))}`);

            setTimeout(function () {
                person.roles.add(mainrole.id);
                person.roles.remove(muterole.id);
                msg.channel.send(`@${person.user.tag} a primit unmute!`)
            }, ms(time));



            break;
        case 'help':
            const Emded = new MessageEmbed()
                .setTitle("Help")
                .addField("Site-ul comunitatii:", '!site')
                .addField("Autor Bot:", '!autor')
                .addField("Pentru a iti vedea avatar-ul:", '!avatar')
                .addField("Informatii Server Discord:", '!server')
                .addField("Pentru a iti vedea ping-ul:", '!ping')
                .addField("IP Server Minecraft:", '!ip')
                .addField("Store-ul nostru:", '!store')
                .setColor(0xFFC300)
                .setDescription("Comenzile bot-ului")
                .setFooter(" - Bot creat de: **DarkCraft#7854**");

            msg.author.send(Emded);
            break;
        case 'ip':
            msg.channel.send('IP-ul server-ului este: **Play.DarkCraft.Ro**');
            break;
        case 'store':
            msg.channel.send('Store-ul nostru: **https://store.darkcraft.ro**');
            break;
        case 'ban':
            if(!message.member.roles.cache.find(r => r.name === "Creator")) return message.channel.send('Nu ai permisiunile necesare.')
            const omul = msg.mentions.users.first();
            if (omul) {
                const member = msg.guild.member(omul);
                if (omul) {
                    member.ban({
                        resson: 'Ai fost banat pe acest server.'
                    }).then(() => {
                        msg.channel.send(`${user.tag} a fost banat pe acest server.`)

                    }).catch(err => {
                        msg.channel.send(`Nu am putut sa il dau afara pe ${user.tag}`);
                        console.log;
                    });
                } else {
                    msg.channel.send('Acel utilizator nu este pe acest server.');
                }
            } else {
                msg.channel.send('Trebuie sa specifici un utilizator.');
            }

            break;
        case 'kick':
            if(!message.member.roles.cache.find(r => r.name === "Creator")) return message.channel.send('Nu ai permisiunile necesare.')
            const user = msg.mentions.users.first();
            if (user) {
                const member = msg.guild.member(user);
                if (member) {
                    member.kick('Ai fost dat afara de pe server.').then(() => {
                        msg.channel.send(`${user.tag} a fost dat afara de pe server.`);
                    }).catch(err => {
                        msg.channel.send(`Nu am putut sa il dau afara pe ${user.tag}`);
                        console.log;
                    });
                } else {
                    msg.channel.send('Acel utilizator nu este pe acest server.');
                }
            } else {
                msg.channel.send('Trebuie sa specifici un utilizator.')
            }
            break;
        case 'mc':
 
                if(!args[1]) return msg.channel.send('Trebuie sa adaugi un ip.')
                if(!args[2]) return msg.channel.send('Trebuie sa specifici un port.')
     
                ping(args[1], parseInt(args[2]), (error, reponse) =>{
                    if(error) throw error
                    const minecraft = new MessageEmbed()
                    .setTitle('Server Status')
                    .addField('Server IP', reponse.host)
                    .addField('Server Version', reponse.version)
                    .addField('Online Players', reponse.onlinePlayers)
                    .addField('Max Players', reponse.maxPlayers)
                   
                    msg.channel.send(minecraft)
                })
            break

    }

})

bot.login(process.env.token);