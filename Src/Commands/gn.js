const Command = require("../Structures/Command.js");

const responses = [
    "https://tenor.com/view/creature-hungrycreature-hungry-cat-kill-me-gif-13304236", 
    "https://tenor.com/view/sucktea-longdripseason-otter-sleep-sleepy-otter-otter-gif-22990079"
];

module.exports = new Command({
    name: "gn",
    description: "goodnight nils",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        let randomResponse = responses[Math.floor(Math.random()*responses.length)];
        message.reply(randomResponse);
    }
});