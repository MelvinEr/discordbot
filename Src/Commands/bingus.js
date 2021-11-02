const Command = require("../Structures/Command.js");
const Discord = require("discord.js");

const bingusImages = [
    "https://cdn.discordapp.com/attachments/454970814681317377/905158564249735219/bigus_2.jpg", 
    "https://cdn.discordapp.com/attachments/454970814681317377/905158591986688090/bigus_1.jpg",
    "https://cdn.discordapp.com/attachments/454970814681317377/905158621938204702/bpgis.jpg",
    "https://cdn.discordapp.com/attachments/454970814681317377/905158666162929704/bagus_3.jpg"
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