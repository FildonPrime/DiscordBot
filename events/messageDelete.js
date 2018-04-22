module.exports = async message => {
    let channelId = message.client.settings.logchannelId;

    let channels = message.guild.channels.get(channelId);
    let dmessage = await message.content;
    var user = (message.author.toString());
    var channel = (`${message.channel}`);

    var SqlQuery = "INSERT INTO logs (messageAuthor, messageContent, messageId) VALUES (?, ?, ?)"
    var inserts = [message.author.username, dmessage, message.id]
    SqlQuery = message.client.db.format(SqlQuery, inserts);
    message.client.con.query(SqlQuery, function (e, r, f) {
        if (e) {
            console.log(e)
            return message.client.emit('error', "MySql Error, Please mention the BOT author", channels.channel)
        }
        let time = new Date();
        const embed = new Discord.RichEmbed()
            .setTitle(`${time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()} | Message Delete`)
            .setDescription(`${user}`)
            .setColor(8674791)
            .setThumbnail('https://images-ext-1.discordapp.net/external/WElG99vFHu5bBM1-cebN-4LC5b7xHegBafkzDbK6JA8/http/i.imgur.com/fJpAFgN.png?width=90&height=90')
            .addField('info:', `A message sent by ${user} was deleted in ${channel}`)
            .addField('Message:', `${dmessage}`)
            .setFooter(`Message Delete`)
        channels.send(embed)
    })
}