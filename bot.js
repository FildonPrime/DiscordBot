const Discord = require('discord.js');
const BOT = new Discord.Client();

BOT.settings = require('./settings.json');
BOT.colors = require('chalk');

BOT.log = require('./handlers/logHandler');
const GET_DIR_SYNC = require('./module/getDirSync');
const moment = require('moment');
require('./handlers/eventHandler')(BOT);
const fs = require('fs');

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

BOT.db = require('mysql');

BOT.con = BOT.db.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "botdb"
})

BOT.con.connect(err => {
  if (err) {
    throw err
  }
  console.log(BOT.colors.red("CONNECTED TO DATABASE"));
})


let modules = GET_DIR_SYNC('./commands/');
log(`Loading ${modules.length} modules...`);
for (let i = 0; i < modules.length; i++) {
  loadEvent(BOT, modules[i]);
}
const LanguageHandler = require('./handlers/languageHandler');

BOT.strings = new LanguageHandler();
BOT.commands = new Discord.Collection();
BOT.aliases = new Discord.Collection();


function loadEvent(client, module) {
  fs.readdir(`./commands/${module}/`, (err, files) => {
    if (err) {
      console.log(err);
    }
    log(`Loading module: ${module} [${files.length} commands]`);
    files.forEach(f => {
      let props = require(`./commands/${module}/${f}`);
      log(`Loading command: ${props.help.name}`);
      client.commands.set(props.help.name, props);
      props.config.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
}


BOT.login(BOT.settings.token);
