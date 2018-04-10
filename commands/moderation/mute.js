exports.run = (Bot, message, args) => {

    if (!message.guild.me.hasPermission(this.help.botPermission)) {
        return Bot.emit('botNoPermission', this.help.botPermission, message.channel)
    }

    if (!message.member.hasPermission(this.help.botPermission)) {
        return Bot.emit('userNoPermission', this.help.botPermission, message.channel)
    }

    let user = message.mentions.members.first();

    if(!user) {
        return Bot.emit('error', 'Invalid Parameters', 'Please Recheck the mentioned user', message.channel);
    }

    

    message.channel.overwritePermissions(user, {'SEND_MESSAGES': false}).then(() => {
        let reason = args.slice(1).join(' ');
        if(reason.length < 1) {
            reason = "No reason given"
        }

        message.channel.send({
            embed: {
                description: `User successfully muted. Until a moderator unmutes.\n\nReason: ${reason}`,
                color: Bot.settings.moderationColor
            }
        })
    })
}
exports.config = {
    aliases: ['mute'],
    enabled: true
};

exports.help = {
    name: 'mute',
    botPermission: 'SEND_MESSAGES',
    userPermission: 'SEND_MESSAGES',
    usage: 'mute @user reason',
    example: [`mute @user reason`]
};