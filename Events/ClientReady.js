const client = require("../index");
const logger = require('aminologer')
const schedule = require('node-schedule');

client.on("ready", async () => {
    client.user.setActivity({
        name: `Amuse (0) | ${client.guilds.cache.size}`,
        type: "WATCHING"
    })
    logger.log("Successfully loaded whole bot")

    const rule = new schedule.RecurrenceRule();
    rule.hour = 1;
    rule.tz = 'Europe/Warsaw';

    let emojis = {}
    client.config.dev.forEach(dev => {
        client.guilds.fetch(dev)
            .then(guild => {
                guild.emojis.cache.forEach(e => {
                    emojis[e.name.replace("icons_", "")] = `<:${e.identifier}>`
                })
        })
    })
    client.emoji = emojis

    logger.log("Loaded all emojis to cache!")
});