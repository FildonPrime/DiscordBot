module.exports = (description, channel) => {
    channel.send({
        embed: {
            description: `You dont have enough permission to use this command\nPermission Node : ${description}`,
            color: 123465
        }
    })
  };
  