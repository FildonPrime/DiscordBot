const LOAD_EVENTS = event => require(`../events/${event}`);

module.exports = Bot => {
  Bot.on('ready', () => LOAD_EVENTS('ready')(Bot));
  Bot.on('message', LOAD_EVENTS('message'));
  Bot.on('error', LOAD_EVENTS('error'));
  Bot.on('botNoPermission', LOAD_EVENTS('botNoPermission'));
  Bot.on('userNoPermission', LOAD_EVENTS('userNoPermission'));
  Bot.on('messageDelete', LOAD_EVENTS('messageDelete'));
}
