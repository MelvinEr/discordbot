const Discord = require("discord.js");

/**
 * @param {Discord.Message} message 
 * @param {string[]} args 
 * @param {Client} client 
 */

function RunFunction(message, args, client) {

}

class Command {
    constructor(options) {
        /**
         * @typedef {{name: string, description: string, permission: Discord.PermissionString, run: RunFunction}} CommandOptions
         * @param {CommandOptions} options
         */
        this.name = options.name;
        this.description = options.description;
        this.permission = options.permission;
        this.run = options.run;
    }
}

module.exports = Command;