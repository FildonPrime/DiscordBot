const Discord = require('discord.js')
const moment = require('moment');
require("moment-duration-format");
exports.run = (Bot, message, args) => {

    if (!message.guild.me.hasPermission(this.help.botPermission)) {
        return Bot.emit('botNoPermission', this.help.botPermission, message.channel)
    }

    if (!message.member.hasPermission(this.help.botPermission)) {
        return Bot.emit('userNoPermission', this.help.botPermission, message.channel)
    }

    var description, title;


    let type = args[0];
    const embed = new Discord.RichEmbed()
        .setTitle(this.title)
        .setDescription(description);

    const embedWithoutTitle = new Discord.RichEmbed()
        .setDescription(description)
        
    switch (type) {
        case 'bot':
            {
                const duration = moment.duration(Bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

                const embedWithoutTitle = new Discord.RichEmbed()
                .setDescription(`${Bot.user.username}'s Statistics
                \nMemory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
                \nUptime: ${duration}
                \nServers: ${Bot.guilds.size.toLocaleString()}
                \nUsers: ${Bot.users.size.toLocaleString()}
                \nDiscord.js: v\`${Discord.version}\`
                \nNode: \`${process.version}\`
                `)
                .setColor(Bot.settings.color)
                message.channel.send({
                    embed: embedWithoutTitle
                })
            }
            break;
        default:
            {
                message.channel.send({
                    embed: {
                        description: `Invalid Parameters.`
                    }
                })
            }
    }





}
exports.config = {
    aliases: ['status'],
    enabled: true
};

exports.help = {
    name: 'status',
    botPermission: 'SEND_MESSAGES',
    userPermission: 'SEND_MESSAGES',
    usage: 'status type',
    example: [`status type`]
};