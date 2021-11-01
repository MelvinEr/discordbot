const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "kill",
    description: "ends nils life",
    permission: "ADMINISTRATOR",

    async run(message, args, client) {
        message.reply("rip nils 🕊️🕊️");
        
        // kill nils here
    }
});