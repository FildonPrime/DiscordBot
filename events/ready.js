const COLOR = require('chalk');
const Discord = require('discord.js');
module.exports = async Bot => {
  Bot.log.console(COLOR.red('[ONLINE]'));
  Bot.user.setActivity("GitHub Public Repo Update", {
    type: "PLAYING"
  })

  Bot.con.connect(err => {
    if (err) {
      console.log(Bot.colors.red("[ERROR CANT CONNECT TO DATABASE]"))
      //Bot.destroy();
      //return;
    }
    console.log(Bot.colors.red("CONNECTED TO DATABASE"));
  })

  Bot.webhook = new Discord.WebhookClient(Bot.settings.webhook_id, Bot.settings.webhook_token)
  const emb = new Discord.RichEmbed()
  .setDescription(`**${Bot.user.username}** Successfully connected to the DiscordAPI\n\n**ID:** ${Bot.user.id}\n**Verified Status:** ${Bot.user.verified}`)
  .setColor(Bot.mainColors.RED)

  Bot.webhook.send(emb)
}
