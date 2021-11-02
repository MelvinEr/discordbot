const Command = require("../Structures/Command.js");

module.exports = new Command({
    name: "logs",
    description: "shows the 3 most recent audit logs",
    permission: "VIEW_AUDIT_LOG",

    async run(message, args, client) {
        const logs = await message.guild.fetchAuditLogs({limit: 3, type: "ALL"}).then(logs => logs.entries.first());
        console.log(logs);
        // for(let i = 0; i < logs.entries.length; i++) {

        // }
    }
});