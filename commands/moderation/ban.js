exports.run = (Bot, message, args) => {

    if (!message.guild.me.hasPermission(this.help.botPermission)) {
        return Bot.emit('botNoPermission', this.help.botPermission, message.channel)
    }

    if (!message.member.hasPermission(this.help.botPermission)) {
        return Bot.emit('userNoPermission', this.help.botPermission, message.channel)
    }

    let user = message.mentions.users.first(); 
    let reason = args.slice(1).join(' ');

    if (args < 1) return message.channel.send(`\`\`\`\n${Bot.settings.prefix}Ban [user tag] <reason>\n\nBan the mentioned user from the server.\n\`\`\``); //BAN HELP

    if (message.mentions.users.size < 1) return message.reply('You must mention someone to Ban').catch(console.error);

    if (!message.guild.member(user).bannable) return message.reply('cannot Ban that member');

    if (user.id === Bot.settings.ownerId) return message.reply('You cant Ban that person');

    if (user.id === message.author.id) return message.reply('SelfHarm is bad')

    let guildMember = message.guild.members.get(user.id);

    if(!guildMember) {
        return Bot.emit('error', "Invalid Member", "Please recheck the member you tagged", message.channel);
    }

    guildMember.send({
        embed: {
            description: `You got Banned from ${message.guild.name} due to ${reason} by ${message.author.username}`,
            color: 123456
        }
    })

    guildMember.kick().then(() => {
        message.channel.send({
            embed: {
                description: `Successfully Banned \`${guildMember.user.username}\``,
                color: 123456
            }
        })
    })

}
exports.config = {
    aliases: ['ban'],
    enabled: true
};

exports.help = {
    name: 'ban',
    botPermission: 'BAN_MEMBERS',
    userPermission: 'BAN_MEMBERS',
    usage: `\`<prefix>\`ban \`@user\``,
    example: [`ban`]
};