exports.run = (Bot, message, args) => {

    if (!message.guild.me.hasPermission(this.help.botPermission)) {
        return Bot.emit('botNoPermission', this.help.botPermission, message.channel)
    }

    if (!message.member.hasPermission(this.help.botPermission)) {
        return Bot.emit('userNoPermission', this.help.botPermission, message.channel)
    }

    let user = message.mentions.members.first(); 
    let newName = args.slice(1).join(' ');

    if(!newName) {
        return Bot.emit('error', "invalid Syntax", "Please check the new name", message.channel)
    }

    user.setNickname(`${newName}`).then(() => {
        message.channel.send({
            embed: {
                description: "NickName Updated!",
                color: Bot.settings.nickNameEmbed
            }
        })
    })
  
}
exports.config = {
    aliases: ['rename'],
    enabled: true
};

exports.help = {
    name: 'rename',
    botPermission: 'MANAGE_MEMBERS',
    userPermission: 'MANAGE_MEMBERS',
    usage: 'rename @user name',
    example: [`rename @user name`]
};