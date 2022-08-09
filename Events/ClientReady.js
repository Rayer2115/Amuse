const client = require("../index");
const logger = require('aminologer')
const schedule = require('node-schedule');

client.on("ready", async () => {
    let guilds = await client.guilds.fetch()
    let status = [
        `${guilds.size} serwery`,
        `${client.users.cache.size} użytkowników`,
        `${client.channels.cache.filter(c => c.type === `GUILD_TEXT` || c.type === `GUILD_VOICE`).size} kanały`
    ]

    let number = 0

    client.user.setActivity({
        name: `Amuse (0) | ${status[number]}`,
        type: "WATCHING"
    })

    setInterval(() => {
        item = status[number]
        client.user.setActivity({
            name: `Amuse (0) | ${item}`,
            type: "WATCHING"
        })

        number++
        if(number === 3) number = 0
    }, 5000)
    client.logger.log(`Zalogowano jako ${client.user.tag}`)

    const rule = new schedule.RecurrenceRule();
    rule.hour = 1;
    rule.tz = 'Europe/Warsaw';
});