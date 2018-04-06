exports.run = (Bot, message, args) => {

    if (!message.guild.me.hasPermissions(this.help.botPermission)) {
        return Bot.emit('botNoPermission', this.help.botPermission, message.channel)
    }

    if (!message.member.hasPermissions(this.help.botPermission)) {
        return Bot.emit('userNoPermission', this.help.botPermission, message.channel)
    }

    let user = message.mentions.users.first(); 
    let reason = args.slice(1).join(' ');

    if (args < 1) return message.channel.send(`\`\`\`\n${Bot.settings.prefix}kick [user tag] <reason>\n\nkicks the mentioned user from the server.\n\`\`\``); //BAN HELP

    if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick').catch(console.error);

    if (!message.guild.member(user).kickable) return message.reply('cannot kick that member');

    if (user.id === Bot.settings.ownerId) return message.reply('You cant Kick that person');

    if (user.id === message.author.id) return message.reply('SelfHarm is bad')

    let guildMember = message.guild.members.get(user.id);

    if(!guildMember) {
        return Bot.emit('error', "Invalid Member", "Please recheck the member you tagged", message.channel);
    }

    guildMember.send({
        embed: {
            description: `You got kicked from ${message.guild.name} due to ${reason} by ${message.author.username}`,
            color: 123456
        }
    })

    guildMember.kick().then(() => {
        message.channel.send({
            embed: {
                description: `Successfully kicked \`${guildMember.user.username}\``,
                color: 123456
            }
        })
    })

}
exports.config = {
    aliases: ['kick'],
    enabled: true
};

exports.help = {
    name: 'kick',
    botPermission: 'KICK_MEMBERS',
    userPermission: 'KICK_MEMBERS',
    usage: 'rs3x7',
    example: [`rs3x7 1000 @BettingUser`]
};