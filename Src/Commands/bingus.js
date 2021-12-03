const Command = require("../Structures/Command.js");
const Discord = require("discord.js");

const bingusImages = [
    "https://i.kym-cdn.com/entries/icons/original/000/035/557/Hi_Bingus.png", 
    "https://i.imgur.com/9TlwWYI.jpg",
    "https://pbs.twimg.com/media/EpXOllGXMAARo5U.jpg",
    "https://i.ytimg.com/vi/Phju-do--Og/hqdefault.jpg"
];

module.exports = new Command({
    name: "bingus",
    description: "displays random bingus",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {

        let randomBingus = bingusImages[Math.floor(Math.random()*bingusImages.length)];

        const embed = new Discord.MessageEmbed();

        embed

        .setColor("AQUA")

        .setImage(randomBingus)
    
        message.reply({embeds: [embed] });
    }
});