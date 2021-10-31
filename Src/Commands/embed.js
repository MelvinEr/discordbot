const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command({
    name: "embed",
    description: "Shows an embed",
    permission: "SEND_MESSAGES",
    async run(message, args, client) {
        const embed = new Discord.MessageEmbed();

        embed
            .setTitle("This is a test embed")
            .setURL("https://www.twitch.tv/froozie720")
            .setAuthor(
                message.author.username,
                message.author.avatarURL({dynamic: true}),
                "https://www.twitch.tv/froozie720"
            )
            .setDescription(
                "this is a description\nhere is a link: [this is a link](https://www.twitch.tv/froozie720)"
            )

            // .setColor("#FFFFFF")
            .setColor("AQUA")

            // .setThumbnail(message.author.avatarURL({ dynamic: true }))
            .setThumbnail(client.user.avatarURL({ dynamic: true }))

            // returns current date if no parameters
            .setTimestamp()
            .setImage("https://preview.redd.it/dqvlqc596hg61.png?auto=webp&s=b1f30dd56c7db508c7544c237d2631be685e4063")
            
            // .addField ("nils Bot", "1.0.0", true) // adds a single field
            .addFields(
                {
                    name: "nils Bot",
                    value: "1.0.0",
                    inline: true
                },
                {
                    name: "field2",
                    value: client.user.username,
                    inline: true
                }
            )
        message.reply({embeds: [embed] });
    }
});