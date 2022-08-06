const client = require("..");

client.on(`messageCreate`, async (message) => {
    if(message.guild.id != `780352528163930122`) return

    if(message.channel.id != `1000393628201529475`) return

    client.guilds.cache.forEach(async g => {
        let status = await client.db.get(`guilds.${g.id}.newsChannelStatus`)

        if(status === true){
            let channelId = await client.db.get(`guilds.${g.id}.newsChannel`)
            if(!channelId) return
            
            let channel = g.channels.cache.get(channelId)

            const webhooks = await channel.fetchWebhooks();
            const webhook = webhooks.find(wh => wh.name === `Rusty Nowości`);

            if(!webhook){
            webhook = await channel.createWebhook('Rusty Nowości', {
                    avatar: 'https://i.imgur.com/JATf8sP.png',
                })
            }

            webhook.send({
                content: `${message.content}\n\nAutor: \`${message.author.tag}\``
            })
        }
    })
})