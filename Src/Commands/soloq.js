const Command = require("../Structures/Command.js");
const leagueConfig = require("../Data/leagueConfig.json");
const fetch = require("node-fetch");
const key = leagueConfig.key;

const capitalize = (s) => {
    s = s.toLowerCase();
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function convertRank(rank) {
    switch(rank) {
        case "I":
            return 1
        case "II":
            return 2
        case "III":
            return 3
        case "IV":
            return 4
    }
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

const playerNames = ["Melvin", "Hebbe", "Killa2k", "DogOnMan", "Rasékz", "magicaljournies", "Chad Donderpik", "I Main Fizz", "Ablus"];
let soloqData = [];
let players = [];
for (let i = 0; i < playerNames.length; i++) {
    players.push({
        id: "",
        name: playerNames[i],
        rankScore: 0,
        tier: "",
        rank: "",
        lp: null,
        wins: null,
        losses: null,
        winrate: null
    })
}

module.exports = new Command({
    name: "soloq",
    description: "displays league soloq leaderboards",
    permission: "SEND_MESSAGES",

    async run(message, args, client) {
        // converts summoner names to id's
        for (let i = 0; i < players.length; i++) {
            let link = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${players[i].name}?${key}`
            let response = await fetch(link);
            let jsonData = await response.json();
            players[i].id = jsonData.id;
        }

        for (let i = 0; i < players.length; i++) {
            let link = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${players[i].id}?${key}`
            let response = await fetch(link);
            let jsonData = await response.json();
            for (let i = 0; i < jsonData.length; i++) {
                if (jsonData[i].queueType == "RANKED_SOLO_5x5") {
                    soloqData = jsonData[i];
                }
            }

            players[i].tier = capitalize(soloqData.tier);
            players[i].rank = convertRank(soloqData.rank);
            players[i].lp = soloqData.leaguePoints;
            players[i].wins = soloqData.wins;
            players[i].losses = soloqData.losses;

            // calculates winrate and formats the number
            players[i].winrate = round((players[i].wins / (players[i].wins + players[i].losses)), 2);
            players[i].winrate = players[i].winrate.toString();
            if(players[i].winrate.length < 4) {
                players[i].winrate = players[i].winrate.slice(2);
                players[i].winrate += "0";
            }
            else {
                players[i].winrate = players[i].winrate.slice(2);
            }
        }
        // convert ranks to integers for sorting
        for (let i = 0; i < players.length; i++) {
            switch (players[i].tier) {
                case "Challenger":
                    players[i].rankScore = 90;
                    break;
                case "Grandmaster":
                    players[i].rankScore = 80;
                    break;
                case "Master":
                    players[i].rankScore = 70;
                    break;
                case "Diamond":
                    players[i].rankScore = 60;
                    break;
                case "Platinum":
                    players[i].rankScore = 50;
                    break;
                case "Gold":
                    players[i].rankScore = 40;
                    break;
                case "Silver":
                    players[i].rankScore = 30;
                    break;
                case "Bronze":
                    players[i].rankScore = 20;
                    break;
                case "Iron":
                    players[i].rankScore = 10;
                    break;
            }
            switch (players[i].rank) {
                case 1:
                    players[i].rankScore += 5;
                    break;
                case 2:
                    players[i].rankScore += 4;
                    break;
                case 3:
                    players[i].rankScore += 3;
                    break;
                case 4:
                    players[i].rankScore += 2;
                    break;
            }
            players[i].rankScore += players[i].lp * 0.01;
        }

        players.sort((x,y) => {return y.rankScore - x.rankScore});

        // generate the discord message
        let msg = "";
        for (let i = 0; i < players.length; i++) {
            msg += players[i].name + " - " + players[i].tier + " " + players[i].rank + " - " + players[i].lp + "LP - " + players[i].wins + "W " + players[i].losses + "L (" + players[i].winrate + "%)\n";
        }
        message.reply(msg);
    }
});