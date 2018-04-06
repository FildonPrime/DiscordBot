exports.run = (Bot, message, args) => {

    if (!message.guild.me.hasPermissions(this.help.botPermission)) {
        return Bot.emit('botNoPermission', this.help.botPermission, message.channel)
    }

    if (!message.member.hasPermissions(this.help.botPermission)) {
        return Bot.emit('userNoPermission', this.help.botPermission, message.channel)
    }

    let user = message.mentions.users.first(); 
    let reason = args.slice(1).join(' ');

    if (args < 1) return message.channel.send(`\`\`\`\n${settings.prefixyes}kick [user tag] <reason>\n\nkicks the mentioned user from the server.\n\`\`\``); //BAN HELP

    if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick').catch(console.error);

    if (!message.guild.member(user).kickable) return message.reply('cannot kick that member');

    if (user.id === settings.ownerid) return message.reply('You cant Kick that person');

    if (user.id === message.author.id) return message.reply('SelfHarm is bad')

}
exports.config = {
    aliases: ['h'],
    enabled: true
};

exports.help = {
    name: 'help',
    botPermission: 'KICK_MEMBERS',
    userPermission: 'KICK_MEMBERS',
    usage: 'rs3x7',
    example: [`rs3x7 1000 @BettingUser`]
};