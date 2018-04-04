exports.run = (Bot, message, args) => {

let info = [];

info.push({
    name: `Commands`,
    value: `${Bot.commands.filter(cmd => cmd.help.type === 'BET').map(c => `**${c.help.name}** : ${c.help.des}`).join('\n\n')} \n\n**NOTICE** : \`All Commands are not mentioned here.\``
})

message.author.send({
    embed: {
        color: 15982090,
        fields: info,
    }
})

message.channel.send({
    embed: {
        color: 15982090,
        description: `${message.author} Please check your Dms, i've sent you the help commands`
    }

})

}
exports.config = {
    aliases: ['h'],
    enabled: true
};

exports.help = {
    name: 'help',
    botPermission: 'EMBED_LINKS',
    userPermission: 'EMBED_LINKS',
    usage: 'rs3x7',
    example: [`rs3x7 1000 @BettingUser`]
};