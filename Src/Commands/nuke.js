const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "nuke",
    description: "nukes up to 100 messages",
    permission: "ADMINISTRATOR",

    async run(message, args, client) {

        // args[1] is the user inputed parameter
        const amount = args[1];
        if (!amount) {
            return message.reply(`${amount == undefined ? "Nothing" : amount} is not a valid number`);
        }
        // converts the input string to an integer
        const amountParsed = parseInt(amount);

        if (amountParsed > 100) {
            return message.reply("You cannot nuke more than 100 messages");
        }
        message.channel.bulkDelete(amountParsed);
        const msg = await message.channel.send(`Nuked ${amountParsed} messages`);

        // 7 second delay before message deletes itself
        setTimeout(() => msg.delete(), 7000);
    }
});