exports.run = (Bot, message, args) => {
    if (message.author.id != Bot.settings.ownerId) {
        return Bot.emit('error', "Insufficent Permissions", message.channel)
    }

    let type = args[0];

    switch(type) {
        case 'tables': 
        {
            var query
        }
    }






}
exports.config = {
    aliases: ['setup'],
    enabled: true
};

exports.help = {
    name: 'setup',
    botPermission: 'ADMINISTRATOR',
    userPermission: 'ADMINISTRATOR',
    usage: 'rs3x7',
    example: [`status Gaming`]
};