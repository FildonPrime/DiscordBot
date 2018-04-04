exports.run = (Bot, message, args) => {
   
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.send({
            embed: {
                color: message.channel.Bot.color.RED,
                title: 'Insufficent Permissions',
                description: `You dont have sufficent permissions to use this command\n\nRequired Permission : ${this.help.userPermission}`
            }
        })
    }

    let text = args.join(' ');

    if (!text) {
        return Bot.emit('error', "Incomplete Syntax", "Invalid status message\n\n`<prefix>status Use your custom status message here`", message.channel)
    }

    Bot.user.setActivity(`${text}`, {
        type: 'WATCHING'
    }).then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))

}
exports.config = {
    aliases: ['status'],
    enabled: true
};

exports.help = {
    name: 'setstatus',
    botPermission: 'ADMINISTRATOR',
    userPermission: 'ADMINISTRATOR',
    usage: 'rs3x7',
    example: [`status Gaming`]
};