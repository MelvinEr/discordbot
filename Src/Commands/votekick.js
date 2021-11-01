const Command = require("../Structures/Command.js");
const Discord = require("discord.js");

let kickTargetId = "";
let votesString = "React with 👍 to kick, react with 👎 to keep \n\n";
let votes = [];
let hasVoted = [];

function formatId(id) {
    // converts => "<@!321335595328864257>" into => "321335595328864257"
    return id.slice(3, id.length - 1);
}

module.exports = new Command({
    name: "votekick",
    description: "kicks the user if vote majority",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {

        const kickTargetUsername = args[1];
        if(kickTargetUsername[0] === "<") {
            // fetch user id by @ => "?votekick @Melle"
            kickTargetId = formatId(kickTargetUsername);
        }
        else {
            // fetch user id by username (case sensitive) => "?votekick Melle#4544"
            kickTargetId = client.users.cache.find(u => u.tag === kickTargetUsername).id
        }
        const kickTarget = await client.users.fetch(kickTargetId, { cache: true });
        if (!kickTarget) { 
            message.reply("User not found");
            return;
        }

        const embed = new Discord.MessageEmbed();
        embed
            .setTitle("Votekick " + kickTarget.tag)

            .setDescription(votesString)

            // .setColor("#FFFFFF")
            .setColor("AQUA")

            .setThumbnail(kickTarget.avatarURL({ dynamic: true }))
            // .setThumbnail(client.user.avatarURL({ dynamic: true }))

            // returns current date if no parameters
            .setTimestamp();
        
        let botMessage = await message.channel.send({ embeds: [embed] });
        try {
            await botMessage.react("👍");
            await botMessage.react("👎");
        } catch (err) {
            channel.send("nils sad :(")
        }

        const filter = (reaction) => {
            return reaction.emoji.name === '👍' || reaction.emoji.name === '👎';
        };

        // collects reactions for 3 minutes
        const collector = botMessage.createReactionCollector({ filter, time: 180000 });

        collector.on('collect', (reaction, user) => {

            if(hasVoted.includes(user.id)) {
                return;
            }
            else {
                hasVoted.push(user.id);
            }

            // updating the votes
            if(votes.length < 5) {
                if(reaction.emoji.name === "👍") {
                    votes.push(1);
                    votesString += "🟩 ";
                }
                else if(reaction.emoji.name === "👎") {
                    votes.push(0);
                    votesString += "🟥 ";
                }
            }
            else if(votes.length >= 5) {

                // calculate vote result
                let voteScore = 0;
                for(let i = 0; i < votes.length; i++) {
                    voteScore += votes[i];
                }
                if(voteScore >= 4) {
                    channel.send(kickTarget.tag + " was kicked");
                    kickTarget.kick();
                }
            }
            else {
                console.log("idk chief something broke i guess")
            }
            
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);

            // update embed to show new votes
            let updatedEmbed = new Discord.MessageEmbed();
            updatedEmbed = embed;
            updatedEmbed.setDescription(votesString);
            botMessage.edit({ embeds: [updatedEmbed] });
        });
        
        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
    }
});