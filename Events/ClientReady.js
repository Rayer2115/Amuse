const client = require("../index");
const logger = require('../Tools/Logger')
const schedule = require('node-schedule');

client.on("ready", async () => {
    client.user.setActivity({
        name: `Rusty (0) | Zaprosisz uwu?`,
        type: "WATCHING"
    })
    setInterval(() => {
        client.user.setActivity({
            name: `Rusty (0) | Zaprosisz uwu?`,
            type: "WATCHING"
        })
    }, 300000)
    logger.load("Successfully loaded whole bot")

    const rule = new schedule.RecurrenceRule();
    rule.hour = 1;
    rule.tz = 'Europe/Warsaw';

    const job = schedule.scheduleJob(rule, async function(){
        await client.db.delete(`messagesDay`)
        console.log("Usunieto dzienne wiadomosci!")
    });
});