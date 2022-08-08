const client = require("../index");
const logger = require('aminologer')
const schedule = require('node-schedule');

client.on("ready", async () => {
    client.user.setActivity({
        name: `Amuse (0) | ${client.guilds.cache.size}`,
        type: "WATCHING"
    })
    client.logger.log(`Zalogowano jako ${client.user.tag}`)

    const rule = new schedule.RecurrenceRule();
    rule.hour = 1;
    rule.tz = 'Europe/Warsaw';
});