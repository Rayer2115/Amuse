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

    const webhooks = await channel.fetchWebhooks();
    const webhook = webhooks.find(wh => wh.name === `Rusty Propozycje`);

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
        username: message.user.username,
        avatarURL: message.member.displayAvatarURL(),
        embeds: [embed]
    })

    message.delete()
})