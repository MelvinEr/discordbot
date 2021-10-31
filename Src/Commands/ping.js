const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "ping",
    description: "ping check",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        message.reply(`Ping: ${client.ws.ping} ms.`)
    }
});