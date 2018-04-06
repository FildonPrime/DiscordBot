module.exports = (description, channel) => {
  channel.send({
      embed: {
          description: `InSuffient Permission to use this command\nPermission Node : ${description}`,
          color: 123465
      }
  })
};
