exports.run = (Bot, message, args) => {
    if (message.author.id != Bot.settings.ownerId) {
        return Bot.emit('error', "Insufficent Permissions", message.channel)
    }

    let type = args[0];

    switch(type) {
        case 'tables': 
        {
            var Sqlquery = "CREATE TABLE logs (Counter INT NOT NULL AUTO_INCREMENT, messageId INTEGER(36), messageAuthor VARCHAR(36), messageContent VARCHAR(256), PRIMARY KEY (Counter))"
            Bot.con.query(Sqlquery, function(e, r,f) {
                if(e) {
                    console.log(e)
                    return Bot.emit('error', "MySql Error, Please mention the BOT author", message.channel)
                }
                message.channel.send({
                    embed: {
                        description: "Success! Tables recached and created."
                    }
                })
            })
        }
        break;
        default: {
            message.channel.send({
                embed: {
                    description: "Invalid option. Please recheck."
                }
            })
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