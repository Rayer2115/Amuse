const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
module.exports = {
    name: "kick",
    cooldowns: 7000,
    description: "Wyrzuca użytkownika",
    type: "CHAT_INPUT",
    perms: [`KICK_MEMBERS`],
    options: [
        {
            name: `użytkownik`,
            description: `Użytkownik którego ma wyrzucić bot`,
            type: `USER`,
            required: true
        },
        {
            name: `powód`,
            description: `Powód wyrzucenia użytkownika`,
            type: `STRING`
        }
    ],
    run: async (client, interaction) => {
        let member = interaction.options.getMember(`użytkownik`)
        let powód = interaction.options.getString(`powód`) || `Nie podano powodu`

        if(member.permissions.has(`ADMINISTRATOR`) || !member.bannable){
            let embed = new MessageEmbed()
            .setTitle(`Wystąpił błąd...`)
            .setColor(client.config.primary)
            .setDescription(`Nie można wyrzucić tego uzytkownika, możliwe że ma on permisje administratora!`)

            return interaction.reply({
                embeds: [embed]
            })
        }

        if(interaction.member.roles.cache.first().position <= member.roles.cache.first().position){
            let embed = new MessageEmbed()
            .setTitle(`Wystąpił błąd...`)
            .setColor(client.config.primary)
            .setDescription(`Użytkownik ma tą samą rangę lub wyższą!`)

            return interaction.reply({
                embeds: [embed]
            })
        }

        let user = client.users.cache.get(member.id)

        let cEmbed = new MessageEmbed()
        .setTitle(`Wyrzucono!`)
        .setColor(client.config.primary)
        .addFields(
            {
                name: `Administrator`,
                value: `**${interaction.user.tag}** \`(${interaction.user.id})\``,
                inline: true
            },
            {
                name: `Wyrzucony`,
                value: `**${user.tag}** \`(${user.id})\``,
                inline: true
            },
            {
                name: `Powód`,
                value: `${powód}`,
                inline: true
            },
        )
        .setThumbnail(user.avatarURL({dynamic: true}))

        let pEmbed = new MessageEmbed()
        .setTitle(`Zostałeś wyrzucony!`)
        .setColor(client.config.primary)
        .addFields(
            {
                name: `Administrator`,
                value: `**${interaction.user.tag}** \`(${interaction.user.id})\``,
                inline: true
            },
            {
                name: `Serwer`,
                value: `**${interaction.guild.name}** \`(${interaction.guild.id})\``,
                inline: true
            },
            {
                name: `Powód`,
                value: `${powód}`,
                inline: true
            },
        )
        .setThumbnail(interaction.guild.iconURL({dynamic: true}))

        await interaction.reply({
            embeds: [cEmbed]
        })
        .then(() => {
            user.send({
                embeds: [pEmbed]
            })
        })
        .catch((err) => {
            interaction.channel.send(`Nie można wysłać wiadomości prywatnej do użytkownika`)
        })

        member.kick({
            reason: powód
        })
      
    },
};