const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    Message,
} = require("discord.js");
module.exports = {
    name: "autorola",
    cooldowns: 1000,
    description: "Ustaw moduł autoroli",
    type: "CHAT_INPUT",
    options: [
        {
            name: "dodaj",
            description: "Dodaj rolę do autoroli",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "rola",
                    description: "Rola którą bot nada użytkownikowi przy wejściu",
                    type: "ROLE",
                    required: true
                }
            ]
        },
        {
            name: "usuń",
            description: "Usuń rolę z autoroli",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "rola",
                    description: "Rola którą bot nada użytkownikowi przy wejściu",
                    type: "ROLE",
                    required: true
                }
            ]
        },
        {
            name: "status",
            description: "Status autoroli (on/off)",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "status",
                    description: "Włącz lub wyłącz autorolę",
                    type: "STRING",
                    choices: [
                        {name: "włącz", value: "on"},
                        {name: "wyłącz", value: "off"}
                    ],
                }
            ]
        }
    ],
    perms: ["MANAGE_GUILD"],
    run: async (client, interaction) => {
      let _sbc = interaction.options.getSubcommand()

      if(_sbc == `dodaj`){
        let rola = interaction.options.getRole(`rola`)

        let roleArray = await client.db.get(`guilds.${interaction.guild.id}.autorola`)

        if(roleArray){
            if(roleArray.length === 5) {
                let embed = new MessageEmbed()
                .setTitle(`Wystąpił problem...`)
                .setColor(client.config.primary)
                .setDescription(`Nie można dodaj wiecej niż 5 autoroli!`)

                return interaction.reply({
                    embeds: [embed]
                })
            }

            if(roleArray.includes(rola.id)){
                let embed = new MessageEmbed()
                .setTitle(`Wystąpił problem...`)
                .setColor(client.config.primary)
                .setDescription(`Ta rola już została dodana!`)

                return interaction.reply({
                    embeds: [embed]
                })
            }
        }

        if(!rola.editable){
            let embed = new MessageEmbed()
            .setTitle(`Wystąpił problem...`)
            .setColor(client.config.primary)
            .setDescription(`Bot nie ma permisji do tej roli!`)

            return interaction.reply({
                embeds: [embed]
            })
        }

        await client.db.push(`guilds.${interaction.guild.id}.autorola`, rola.id)

        let embed = new MessageEmbed()
        .setTitle(`Wykonano zmiany!`)
        .setColor(client.config.primary)
        .setDescription(`${interaction.member} zmienił ustawienia autoroli!`)
        .addField(`Rola została dodana`, `${rola}`)

        return interaction.reply({
            embeds: [embed]
        })
      }
      if(_sbc == `usuń`){
        let rola = interaction.options.getRole(`rola`)

        let role = await client.db.get(`guilds.${interaction.guild.id}.autorola`)

        if(!role.includes(rola.id)) {
            let embed = new MessageEmbed()
            .setTitle(`Wystąpił bład...`)
            .setColor(client.config.primary)
            .setDescription(`Ta rola nie została wcześniej dodano jako autorola!`)

            return interaction.reply({
                embeds: [embed]
            })
        }

        if(!rola.editable){
            let embed = new MessageEmbed()
            .setTitle(`Wystąpił problem...`)
            .setColor(client.config.primary)
            .setDescription(`Bot nie ma permisji do tej roli!`)

            return interaction.reply({
                embeds: [embed]
            })
        }

        await client.db.pull(`guilds.${interaction.guild.id}.autorola`, rola.id)

        let embed = new MessageEmbed()
        .setTitle(`Wykonano zmiany!`)
        .setColor(client.config.primary)
        .setDescription(`${interaction.member} zmienił ustawienia autoroli!`)
        .addField(`Rola została usunięta`, `${rola}`)

        return interaction.reply({
            embeds: [embed]
        })
      }
      if(_sbc == `status`){
        let status = interaction.options.getString(`status`)

        if(!status){
            let role = await client.db.get(`guilds.${interaction.guild.id}.autorola`)

            if(!role) {
                let embed = new MessageEmbed()
                .setTitle(`Wystąpił błąd...`)
                .setDescription(`Użytkownik po wejściu na serwer nie dostanie żadnej roli`)
                .setColor(client.config.primary)

                return interaction.reply({
                    embeds: [embed]
                })
            }

            let kurwaJebanyArray = []
            role.forEach(rolaId => kurwaJebanyArray.push(`<@&${rolaId}>`))
            let wlaczoneKurwa = await client.db.get(`guilds.${interaction.guild.id}.autorolaStatus`)
            if(wlaczoneKurwa === true) wlaczoneKurwa = `Włączona`
            if(wlaczoneKurwa === false || !wlaczoneKurwa) wlaczoneKurwa = `Wyłączona`

            let embed = new MessageEmbed()
            .setTitle(`Ustawienia autoroli`)
            .setColor(client.config.primary)
            .setDescription(`Na serwerze **${interaction.guild.name}** autorola jest \`${wlaczoneKurwa}\``)
            .addField(`Nadawane role`, `${wlaczoneKurwa === `Włączona` ? kurwaJebanyArray : `\`Obecnie autorola jest wyłączona\``}`)

            return interaction.reply({
                embeds: [embed]
            })


        }

        if(status == `on`){
            let role = await client.db.get(`guilds.${interaction.guild.id}.autorola`)

            if(!role) {
                let embed = new MessageEmbed()
                .setTitle(`Wystąpił błąd...`)
                .setDescription(`Nie została ustawiona żadna rola! Ustaw ją komendą \` /autorola rola \``)
                .setColor(client.config.primary)

                return interaction.reply({
                    embeds: [embed]
                })
            }
            let kurwaJebanyArray = []
            role.forEach(rolaId => kurwaJebanyArray.push(`<@&${rolaId}>`))
            await client.db.set(`guilds.${interaction.guild.id}.autorolaStatus`, true)

            let embed = new MessageEmbed()
            .setTitle(`Wykonano zmiany!`)
            .setColor(client.config.primary)
            .setDescription(`Autorola została włączona! Od teraz nowy użytkownik dostanie rolę ${kurwaJebanyArray.join(`, `)}`)

            return interaction.reply({
                embeds: [embed]
            })
        }
        if(status == `off`){
            await client.db.set(`guilds.${interaction.guild.id}.autorolaStatus`, false)

            let embed = new MessageEmbed()
            .setTitle(`Wykonano zmiany!`)
            .setColor(client.config.primary)
            .setDescription(`Autorola została wyłączona! Od teraz nowy użytkownik nie dostanie żadnej roli!`)

            return interaction.reply({
                embeds: [embed]
            })
        }
      }
    },
};