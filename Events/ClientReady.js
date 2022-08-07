const client = require("../index");
const logger = require('../Tools/Logger')
const schedule = require('node-schedule');

client.on("ready", async () => {
    client.user.setActivity({
        name: `Rusty (0) | Zaprosisz uwu?`,
        type: "WATCHING"
    })
    logger.load("Successfully loaded whole bot")

    const rule = new schedule.RecurrenceRule();
    rule.hour = 1;
    rule.tz = 'Europe/Warsaw';

    const job = schedule.scheduleJob(rule, async function(){
        await client.db.delete(`messagesDay`)
        console.log("Usunieto dzienne wiadomosci!")
    });

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

    logger.load("Loaded all emojis to cache!")
});