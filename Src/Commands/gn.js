const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "gn",
    description: "goodnight nils",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        message.reply("https://tenor.com/view/creature-hungrycreature-hungry-cat-kill-me-gif-13304236")
    }
});