const logger = require(`aminologer`)
logger.clear()

const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767, allowedMentions: { repliedUser: false } });
const { QuickDB } = require('quick.db-9.0.0')
const {Player} = require('discord-player')
const dg = require('discord-giveaways')
client.player = new Player(client);

module.exports = client;
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.config = require("./Data/Config.js");
client.db = new QuickDB({filePath: "./Data/database.sqlite"});

client.logger = logger
const manager = new dg.GiveawaysManager(client, {
    storage: './giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: client.config.primary,
        embedColorEnd: client.config.primary,
        reaction: "🤙"
    }
})

client.giveawaysManager = manager

require("./Handler")(client);
client.login(client.config.secret);

process.on("unhandledRejection", (reason, p) => {
    logger.error(reason, p)
    // const consoleChannel = client.channels.cache.get(`1003614088569573427`)
    // consoleChannel.send(reason, p)
});
process.on("uncaughtException", (err, origin) => {
    logger.error(err, origin)
    // const consoleChannel = client.channels.cache.get(`1003614088569573427`)
    // consoleChannel.send(err, origin)
});
process.on("multipleResolves", (type, promise, reason) => {
    logger.error(type, promise, reason)
    // const consoleChannel = client.channels.cache.get(`1003614088569573427`)
    // consoleChannel.send(type, promise, reason)
});