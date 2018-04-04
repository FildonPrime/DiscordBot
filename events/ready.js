const COLOR = require('chalk');

module.exports = async Bot => {
    Bot.log.console(COLOR.red('[ONLINE]'));
    Bot.user.setActivity("GitHub Public Repo Update", {type : "PLAYING"})
}
