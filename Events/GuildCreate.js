const client = require(`..`)

client.on("guildCreate", async (guild) => {
    let logChannel = client.channels.cache.find(c => c.id === `1005539511222145024`)

    let gbanStatus = await client.db.get(`g${guild.id}.gban.reason`)

    if(gbanStatus && gbanStatus != false){
        // let errChannel = guild.channels.cache.first()

        // errChannel.send({
        //     content: `Ten serwer posiada globalną blokadę za **${gbanStatus}**`
        // })

        let owner = await guild.fetchOwner()
        owner.send({
            content: `Ten serwer posiada globalną blokadę za **${gbanStatus}**`
        })

        logChannel.send({
            content: `Bot został dodany na serwer **${guild.name}** \`(${guild.id})\` ale serwer ma globalną blokadę i bot wyszedł`
        })

        return guild.leave()
    }

    logChannel.send({
        content: `Bot został dodany na serwer **${guild.name}** \`(${guild.id})\``
    })
})

client.on("guildDelete", async (guild) => {
    let logChannel = client.channels.cache.find(c => c.id === `1005539511222145024`)

    logChannel.send({
        content: `Bot został wyrzucony/wyszedł z serwera **${guild.name}** \`(${guild.id})\``
    })
})