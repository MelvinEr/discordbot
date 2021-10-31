const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "hej",
    description: "botten säger hej =)",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        message.reply("hje =)")
    }
});