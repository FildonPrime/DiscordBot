const COLOR = require('chalk');

module.exports = async Bot => {
    Bot.log.console(COLOR.red('[ONLINE]'));
    
    Bot.sql.run("CREATE TABLE IF NOT EXISTS data (amount TEXT, user1 TEXT UNIQUE, user2 TEXT UNIQUE, user1roll INTEGER, user2roll INTEGER)").then(() => {
       console.log(COLOR.green('DATABASE ONLINE'))
    })

    Bot.user.setActivity("GitHub Public Repo Update", {type : "PLAYING"})
}