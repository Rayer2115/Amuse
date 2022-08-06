const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    MessageButton,
} = require("discord.js");
const hexCheck = require('is-hexcolor')
module.exports = {
    name: "ticket",
    cooldowns: 7000,
    description: "Ustaw moduł ticketów",
    perms: ["MANAGE_GUILD"],
    type: "CHAT_INPUT",
    options: [
        {
            name: `ustaw`,
            description: `Ustawienia embeda`,
            type: `SUB_COMMAND`,
            options: [
                {
                    name: `tytuł`,
                    description: `Tzw. title czyli główny tekst w embedzie`,
                    type: `STRING`,
                    required: true
                },
                {
                    name: `opis`,
                    description: `Poprostu napis który nie jest odznaczony`,
                    type: `STRING`,
                    required: true
                },
                {
                    name: `kanał`,
                    description: `Kanał na którym ma być wiadomość!`,
                    type: `CHANNEL`,
                    required: true
                },
                {
                    name: `kategoria`,
                    description: `Kategoria tworzenia ticketów!`,
                    type: `CHANNEL`,
                    required: true
                },
                {
                    name: `rolasup`,
                    description: `Rola supportu która będzie miała dostęp do ticketów!`,
                    type: `ROLE`,
                },
                {
                    name: `miniaturka`,
                    description: `Zdjęcie które ukaże się w rogu embeda`,
                    type: `STRING`
                },
                {
                    name: `kolor`,
                    description: `Kolor podany w HEX`,
                    type: `STRING`
                },
                {
                    name: `napis_na_przycisku`,
                    description: `Co ma być napisane na przycisku`,
                    type: `STRING`
                }
            ]
        },
        {
            name: `status`,
            description: `Ustawia status ticketów`,
            type: `SUB_COMMAND`,
            options: [
                {
                    name: `opcja`,
                    description: `Status ticketów on/off`,
                    type: `STRING`,
                    choices: [
                        {name: `Włącz`, value: `on`},
                        {name: `Wyłącz`, value: `off`}
                    ],
                    required: true
                }
            ]
        }
    ],
    run: async (client, interaction) => {
      let _sbc = interaction.options.getSubcommand()

      if(_sbc === `ustaw`){
        let title = interaction.options.getString(`tytuł`)
        let description = interaction.options.getString(`opis`)
        let thumbnail = interaction.options.getString(`miniaturka`) || null
        let hex = interaction.options.getString(`kolor`) || null
        let btn_text = interaction.options.getString(`napis_na_przycisku`) || null
        let channel = interaction.options.getChannel(`kanał`)
        let category = interaction.options.getChannel(`kategoria`)
        let supportRole = interaction.options.getRole(`rolasup`)

        if(category.type != `GUILD_CATEGORY`){
            let embed = new MessageEmbed()
                .setTitle(`Wystąpił błąd...`)
                .setColor(client.config.primary)
                .setDescription(`Wybrany kanał nie jest kategorią!`)

                return interaction.reply({
                    embeds: [embed]
                })
        }

        if(!channel.isText()){
            let embed = new MessageEmbed()
                .setTitle(`Wystąpił błąd...`)
                .setColor(client.config.primary)
                .setDescription(`Wybrany kanał nie jest kanałem tekstowym!`)

                return interaction.reply({
                    embeds: [embed]
                })
        }

        if(hex != null){
            if(hexCheck(hex) == false){
                let embed = new MessageEmbed()
                .setTitle(`Wystąpił błąd...`)
                .setColor(client.config.primary)
                .setDescription(`HEX który podałes nie jest poprawny!`)

                return interaction.reply({
                    embeds: [embed]
                })
            }
        }

        if(thumbnail != null){
            if(!thumbnail.includes(`http`) && thumbnail.endsWith(`.png`) || !thumbnail.includes(`https`) && thumbnail.endsWith(`.png`)){
                let embed = new MessageEmbed()
                    .setTitle(`Wystąpił błąd...`)
                    .setColor(client.config.primary)
                    .setDescription(`Link jest nie jest poprawny!`)
    
                    return interaction.reply({
                        embeds: [embed]
                    })
            }
        }

        if(supportRole){
            await client.db.set(`guilds.${interaction.guild.id}.tickety.suprole`, supportRole.id)
        }
        if(hex){
            await client.db.set(`guilds.${interaction.guild.id}.tickety.hex`, hex)
        }

        let embed = new MessageEmbed()
        .setTitle(title)
        .setColor(hex === null ? client.config.primary : hex)
        .setDescription(description)

        if(thumbnail != null) embed.setThumbnail(thumbnail)

        let row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('ticket')
					.setLabel(btn_text === null ? `Otwórz ticketa!` : btn_text)
					.setStyle('SECONDARY')
			);


        interaction.reply({
            content: `Wysłano pomyślnie!`,
            ephemeral: true
        })

        await client.db.set(`guilds.${interaction.guild.id}.tickety.category`, category.id)

        return channel.send({
            embeds: [embed],
            components: [row]
        })
      }

      if(_sbc === `status`){
        let status = interaction.options.getString(`opcja`)

        await client.db.set(`guilds.${interaction.guild.id}.tickety.status`, status === `on` ? true : false)

        let embed = new MessageEmbed()
        .setTitle(`Wykonano zmiany!`)
        .setColor(client.config.primary)
        .setDescription(`${interaction.member} zmienił status ticketów!`)
        .addField(`Status`, `\`${status === `on` ? `Włączone` : `Wyłączone`}\``)

        return interaction.reply({
            embeds: [embed]
        })
      }
    },
};