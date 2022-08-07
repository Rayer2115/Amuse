const client = require('..')
const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    DiscordAPIError,
} = require("discord.js");

client.on('guildMemberAdd', async (member) => {
    let status = await client.db.get(`guilds.${member.guild.id}.lobby.status`)

    if(status != true) return

    let channelID = await client.db.get(`guilds.${member.guild.id}.lobby.channel`)

    if(!channelID) return

    let channel = member.guild.channels.cache.get(channelID)

    let message = await client.db.get(`guilds.${member.guild.id}.lobby.hi`)

    if(!message) return

    let user = client.users.cache.get(member.id)

    let members = await member.guild.members.fetch()

    let bots = 0

    members.forEach(user => {
        if(user.user.bot){
            bots++
        }
    })



    let messageEdited = message
    .replaceAll(`{user}`, `${member}`)
    .replaceAll(`{user.name}`, `${member.displayName}}`)
    .replaceAll(`{user.tag}`, `${user.tag}`)
    .replaceAll(`{guild.name}`, `${member.guild.name}`)
    .replaceAll(`{guild.members}`, `${member.guild.memberCount - bots}`)
    .replaceAll(`{guild.bots}`, `${bots}`)
    .replaceAll(`/n`, `\n`)

    let embed = new MessageEmbed()
    .setTitle(`${member.displayName}`)
    .setColor(client.config.primary)
    .setDescription(messageEdited)
    .setThumbnail(user.avatarURL({dynamic: true}))

    channel.send({
        content: `${member}`,
        embeds: [embed]
    })

})

client.on('guildMemberRemove', async (member) => {
    let status = await client.db.get(`guilds.${member.guild.id}.lobby.status`)

    if(status != true) return

    let channelID = await client.db.get(`guilds.${member.guild.id}.lobby.channel`)

    if(!channelID) return

    let channel = member.guild.channels.cache.get(channelID)

    let message = await client.db.get(`guilds.${member.guild.id}.lobby.bye`)

    if(!message) return

    let members = await member.guild.members.fetch()

    let bots = 0

    members.forEach(user => {
        if(user.user.bot){
            bots++
        }
    })

    let user = client.users.cache.get(member.id)

    let messageEdited = message
    .replaceAll(`{user}`, `${member}`)
    .replaceAll(`{user.name}`, `${member.displayName}}`)
    .replaceAll(`{user.tag}`, `${user.tag}`)
    .replaceAll(`{guild.name}`, `${member.guild.name}`)
    .replaceAll(`{guild.members}`, `${member.guild.memberCount - bots}`)
    .replaceAll(`{guild.bots}`, `${bots}`)
    .replaceAll(`/n`, `\n`)

    let embed = new MessageEmbed()
    .setTitle(`${member.displayName}`)
    .setColor(client.config.primary)
    .setDescription(messageEdited)
    .setThumbnail(user.avatarURL({dynamic: true}))

    channel.send({
        embeds: [embed]
    })

})