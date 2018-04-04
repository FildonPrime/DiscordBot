const parseArgs = require('command-line-args');
const COLOR = require('chalk');


module.exports = async message => {
try {
    let usedPrefix = message.client.settings.prefix;

    if(!message.content.startsWith(usedPrefix)) return;

    let args = message.content.split(' ');
    let command = args.shift().slice(usedPrefix.length).toLowerCase();

    let cmd;
    if (message.client.commands.has(command)) {
      cmd = message.client.commands.get(command);
    }
    else if (message.client.aliases.has(command)) {
      cmd = message.client.commands.get(message.client.aliases.get(command).toLowerCase());
    }
    else return;

    console.log(`\n[${new Date()}]`);
    console.log(COLOR.green('[COMMAND]: ') + usedPrefix + command);
    console.log(COLOR.green('[ARGUMENTs]: ') + (args.join(' ') || COLOR.yellow('No arguments to execute')));
    console.log(`${COLOR.green('[SERVER]:')} ${message.guild} ${COLOR.cyan(`<#${message.guild.id}>`)}`);
    console.log(`${COLOR.green('[CHANNEL]:')} #${message.channel.name} ${COLOR.cyan(message.channel)}`);
    console.log(`${COLOR.green('[USER]:')} ${message.author.tag} ${COLOR.cyan(`${message.author}`)}`);


    cmd.run(message.client, message, args);

}catch (e) {
    console.log(e);
  }


}