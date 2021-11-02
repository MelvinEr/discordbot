const Command = require("../Structures/Command.js");

const Discord = require("discord.js");

module.exports = new Command(
    {
    name: "otter",
    description: "Shows an Otter pog :3",
    permission: "SEND_MESSAGES",
    async run(message, args, client) 
        {
        const embed = new Discord.MessageEmbed();

        embed
            .setTitle("Otter Pog!")
            .setDescription(" Very important guis!!!!! ")
            .setImage("https://i.redd.it/gdzmwnkrvvz11.jpg")
        message.reply({embeds: [embed] });
        } 
    });