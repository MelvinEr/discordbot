const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "froozie",
    description: "we're tuned",

    async run(message, args, client) {
        message.reply("Twitch: https://www.twitch.tv/froozie720\n Twitter: https://twitter.com/FrooZie720\n YouTube: https://www.youtube.com/channel/UC_6UCwDxjPdww8DZDh_dq0w\n Make Sure To Follow Me If You Wanna Stay Tuned With My Content <3")
    }
});