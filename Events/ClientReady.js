const client = require("../index");
const logger = require('aminologer')
const schedule = require('node-schedule');

client.on("ready", async () => {
    let guilds = await client.guilds.fetch()
    let users = 0
    guilds.forEach(async guild => {
        let server = await client.guilds.fetch(guild.id)
        users = users + server.memberCount
    })
    let status = [
        `${guilds.size} serwerów`,
        `${users} użytkowników`,
        `${client.channels.cache.filter(c => c.type === `GUILD_TEXT` || c.type === `GUILD_VOICE`).size} kanały`
    ]

    let number = 0

    client.user.setActivity({
        name: `Amuse (0) | ${status[number]}`,
        type: "WATCHING"
    })

    setInterval(async () => {
        let guilds = await client.guilds.fetch()
        
        let users2 = 0
        
        await guilds.forEach(async guild => {
        server = await client.guilds.fetch(guild.id)
        users2 = users2 + server.memberCount
        })

        let status2 = [
            `${guilds.size} serwery`,
            `${users2} użytkowników`,
            `${client.channels.cache.filter(c => c.type === `GUILD_TEXT` || c.type === `GUILD_VOICE`).size} kanały`
        ]


        item = status2[number]
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