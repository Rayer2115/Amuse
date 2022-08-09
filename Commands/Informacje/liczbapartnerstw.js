const Discord = require('discord.js')
module.exports = {
    name: "liczbapartnerstw",
    description: "Sprawdź liczbę partnerstw",
    cooldowns: 7000,
    type: "CHAT_INPUT",
    options: [
        {
            name: `użytkownik`,
            description: `Użytkownik któremu chcesz sprawdzić partnerstwa`,
            type: `USER`
        }
    ],
    run: async (client, interaction, args) => {
        let member = interaction.options.getMember(`użytkownik`) || interaction.member

        let partnerstwa = await client.db.get(`guilds.${interaction.guild.id}.partnerstwa.${member.id}`)

        let embed = new Discord.MessageEmbed()
        .setTitle(`Partnerstwa ${member.displayName}`)
        .setColor(client.config.primary)
        .setDescription(`${member} posiada \` ${partnerstwa || 0} \` partnerstw!`)
        .setThumbnail(member.displayAvatarURL({dynamic: true}))

        return interaction.reply({
            embeds: [embed]
        })

    }
}