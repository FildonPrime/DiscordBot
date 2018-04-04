const COLOR = require('chalk');

module.exports = (error, description, channel) => {
  if (channel) {
    channel.send({
      embed: {
        color: channel.client.colors.RED,
        title: `${error}`,
        description: `${description}`
      }
    }).catch(e => {
      channel.client.log.error(e);
    });
  }
  else {
    console.log(COLOR.red('[ERROR EVENT]'));
    console.log(error);
    console.log(COLOR.red('[/ERROR EVENT]'));
  }
};
