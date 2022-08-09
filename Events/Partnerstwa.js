const client = require("..");
const dinv = require('discord-inv')
const { MessageEmbed, Interaction } = require(`discord.js`);
const { info } = require("console");

client.on(`messageCreate`, async (message) => {
    if(message.author.bot) return
    let guild = message.guild
    let status = await client.db.get(`guilds.${guild.id}.partnerstwa.status`)

    if(status != true) return

    let channelID = await client.db.get(`guilds.${guild.id}.partnerstwa.channel`)


    if(!channelID) return

    let channel = guild.channels.fetch(channelID)

    if(message.channel.id != channelID) return

    if(message.content.includes(`discord.gg`) || message.content.includes(`discord.com`)) {

    await client.db.add(`guilds.${guild.id}.partnerstwa.${message.member.id}`, 1)
    let partnerstwa = await client.db.get(`guilds.${guild.id}.partnerstwa.${message.member.id}`)


    let embed = new MessageEmbed()
    .setTitle(`Nowe partnerstwo!`)
    .setColor(client.config.primary)
    .setDescription(`Dziękujemy ${message.mentions.users.first() ? `${message.mentions.users.first()}` : `ci`} za partnerstwo z **${guild.name}**!`)
    .addField(`Partnerstwo nawiązał`, `${message.member}`)
    .setFooter({
        text: `${message.member.displayName} to już twoje ${partnerstwa} partnerstwo!`,
        iconURL: message.member.displayAvatarURL({dynamic: true})
    })
    .setThumbnail(guild.iconURL({dynamic: true}))

    message.reply({
        embeds: [embed]
    })

    let rolaID = await client.db.get(`guilds.${guild.id}.partnerstwa.role`)

    if(rolaID && message.mentions.users.first()){
        let memberL = message.mentions.users.first()

        let member = await guild.members.fetch(memberL)

        let rola = await guild.roles.fetch(rolaID)

        member.roles.add(rola)
    }
    }
})