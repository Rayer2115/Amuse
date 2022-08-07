const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    DiscordAPIError,
} = require("discord.js");
module.exports = {
    name: "lobby",
    cooldowns: 7000,
    description: "Zarządaj powitaniami i pożegnaniami",
    type: "CHAT_INPUT",
    perms: ["ADMINISTRATOR"],
    options: [
        {
            name: `kanal`,
            description: `Ustaw kanał lobby`,
            type: `SUB_COMMAND`,
            options: [
                {
                    name: `kanal`,
                    description: `Kanał na którym będą wyświetlać się powitania i pożegnania`,
                    type: `CHANNEL`,
                    required: true,
                }
            ]
        },
        {
            name: `wiadomosc`,
            description: `Ustaw wiadomosci powitan i pozegnan`,
            type: `SUB_COMMAND`,
            options: [
                {
                    name: `wiadomosc-powitan`,
                    description: `Wiadomosc ktora wyswietla sie podczas witania`,
                    type: `STRING`,
                    required: true
                },
                {
                    name: `wiadomosc-pozegnan`,
                    description: `Wiadomosc ktora wyswietla sie podczas zegnania`,
                    type: `STRING`,
                    required: true
                }
            ]
        },
        {
            name: `status`,
            description: `Włącz lub wyłącz lobby`,
            type: `SUB_COMMAND`,
            options: [
                {
                    name: `status`,
                    description: `Włącz lub wyłącz nowości`,
                    type: `STRING`,
                    choices: [
                        {name: `Włącz`, value: `on`},
                        {name: `Wyłącz`, value: `off`}
                    ],
                }
            ]
        }
    ],
    /**
     * 
     * @param {Discord.Client} client 
     * @param {Discord.Interaction} interaction 
     */
    run: async (client, interaction) => {
        let _sbc = interaction.options.getSubcommand()

        if(_sbc === `kanal`){
            let channel = interaction.options.getChannel(`kanal`)

            if(!channel.isText()){
                let embed = new MessageEmbed()
                .setTitle(`Wystąpił bład...`)
                .setColor(client.config.primary)
                .setDescription(`Kanał lobby musi być kanałem tekstowym!`)

                return interaction.reply({
                    embeds: [embed]
                })
            }

            await client.db.set(`guilds.${interaction.guild.id}.lobby.channel`, channel.id)

            let embed = new MessageEmbed()
            .setTitle(`Wykonano zmiany!`)
            .setColor(client.config.primary)
            .setDescription(`${interaction.member} zmienił ustawienia lobby!`)
            .addField(`Nowy kanał`, `${channel}`)

            return interaction.reply({
                embeds: [embed]
            })
        }

        if(_sbc === `wiadomosc`){
            let hiMessage = interaction.options.getString(`wiadomosc-powitan`)
            let byeMessage = interaction.options.getString(`wiadomosc-pozegnan`)

            await client.db.set(`guilds.${interaction.guild.id}.lobby.hi`, hiMessage)
            await client.db.set(`guilds.${interaction.guild.id}.lobby.bye`, byeMessage)

            let embed = new MessageEmbed()
            .setTitle(`Wykonano zmiany!`)
            .setColor(client.config.primary)
            .setDescription(`${interaction.member} zmienił wiadomości lobby!`)
            .addField(`Wiadomość powitań`, `${hiMessage}`)
            .addField(`Wiadomość pożegnań`, `${byeMessage}`)

            return interaction.reply({
                embeds: [embed]
            })
        }

        if(_sbc === `status`){
            let status = interaction.options.getString(`status`)

            if(!status){
                status = await client.db.get(`guilds.${interaction.guild.id}.lobby.status`)
                let hiMessage = await client.db.get(`guilds.${interaction.guild.id}.lobby.hi`)
                let byeMessage = await client.db.get(`guilds.${interaction.guild.id}.lobby.bye`)
                let channelID = await client.db.get(`guilds.${interaction.guild.id}.lobby.channel`)

                let embed = new MessageEmbed()
                .setTitle(`Ustawienia lobby`)
                .setColor(client.config.primary)
                .setDescription(`Na serwerze **${interaction.guild.name}** lobby jest \`${status === true ? `Włączone` : `Wyłączone`}\``)

                if(status === true){
                    embed.addFields(
                        {
                            name: `Kanał`,
                            value: `<#${channelID}>`,
                            inline: true
                        },
                        {
                            name: `Wiadomość powitań`,
                            value: `${hiMessage}`,
                            inline: true
                        },
                        {
                            name: `Wiadomość pożegnań`,
                            value: `${byeMessage}`,
                            inline: true
                        }
                    )
                }

                return interaction.reply({
                    embeds: [embed]
                })
            }

            await client.db.set(`guilds.${interaction.guild.id}.lobby.status`, status === `on` ? true : false)

            let embed = new MessageEmbed()
            .setTitle(`Wykonano zmiany!`)
            .setColor(client.config.primary)
            .setDescription(`${interaction.member} zmienił status lobby!`)
            .addField(`Status`, `\`${status === `on` ? `Włączone` : `Wyłączone`}\``)

            return interaction.reply({
                embeds: [embed]
            })
        }
    },
};