const client = require("..");
const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");

client.on(`messageCreate`, async (message) => {
    if (message.author.bot) return

    let status = await client.db.get(`guilds.${message.guild.id}.propozycje.status`)

    if(status != true) return

    let channelID = await client.db.get(`guilds.${message.guild.id}.propozycje.channel`)

    if(message.channel.id != channelID) return

    let channel = message.guild.channels.cache.get(channelID)

    let webhooks = await channel.fetchWebhooks();
    let webhook = await webhooks.find(wh => wh.name === `Rusty Propozycje`);

    if(!webhook){
    webhook = await channel.createWebhook('Rusty Propozycje', {
             avatar: 'https://i.imgur.com/JATf8sP.png',
         })
    }

    if(!message.content) message.delete()

    let embed = new MessageEmbed()
    .setDescription(message.content)
    .setColor(client.config.primary)

    webhook.send({
        username: message.member.displayName,
        avatarURL: message.member.displayAvatarURL(),
        embeds: [embed]
    }).then((msg) => {
        msg.react(`<:tak:1001127925657124904>`)
        msg.react(`<:moze:1001127928349872190>`)
        msg.react(`<:nie:1001127927188041888>`)

        msg.startThread({
            name: 'Komentarze'
        }).then((thread) => {
            thread.members.add(`${message.member.id}`)
        })
    })

    message.delete()
})