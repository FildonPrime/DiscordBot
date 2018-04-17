
module.exports = async message => {
    let channelId = message.client.settings.logchannelId;

    let channel = message.guild.channels.get(channelId);
    let msg = await message.content;

    var SqlQuery = "INSERT INTO logs (messageAuthor, messageContent, messageId) VALUES (?, ?, ?)"
    var inserts = [message.author.username, msg, message.id]
    SqlQuery = message.client.db.format(SqlQuery, inserts);
    message.client.con.query(SqlQuery, function(e,r,f) {
        if(e) {
            console.log(e)
            return message.client.emit('error', "MySql Error, Please mention the BOT author", message.channel)
        }
        channel.send({
            embed: {
                description: `**User :** ${message.author}\n**Content :** ${msg}`
            }
        })
    })
}