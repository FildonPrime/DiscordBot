exports.run = (Bot, message, args) => {

    if (!message.guild.me.hasPermission(this.help.botPermission)) {
        return Bot.emit('botNoPermission', this.help.botPermission, message.channel)
    }

    if (!message.member.hasPermission(this.help.botPermission)) {
        return Bot.emit('userNoPermission', this.help.botPermission, message.channel)
    }

    let user = message.mentions.members.first(); 
    let role = args.slice(1).join(' ');

    let guildRole = message.guild.roles.find('name', role);
    if(!guildRole) {
        message.channel.send({
            embed: {
                description: 'Invalid Role Please recheck',
                color: Bot.settings.color
            }
        })
    }

    user.addRole(guildRole).then(() => {
        message.channel.send({
            embed: {
                description: `Success, Role added.`,
                color: Bot.settings.color
            }
        })
    })
}
exports.config = {
    aliases: ['enroll'],
    enabled: true
};

exports.help = {
    name: 'enroll',
    botPermission: 'KICK_MEMBERS',
    userPermission: 'KICK_MEMBERS',
    usage: 'rs3x7',
    example: [`rs3x7 1000 @BettingUser`]
};