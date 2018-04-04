exports.run = (Bot, message, args) => {
  if (message.author.id != Bot.settings.ownerId) {
    return Bot.emit('error', "Insufficent Permissions", message.channel)
  }

  if (args < 0) {
    return Bot.emit('error', "Insufficent Parameters", message.channel)
  }
  let type = args[0];

  if (type < 0) {
    return Bot.emit('error', "Insufficent Parameters", message.channel)
  }
  let setmsg = args[1].join(' ');

  message.channel.send(`${type}`)
  message.channel.send(`${setmsg}`)


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
