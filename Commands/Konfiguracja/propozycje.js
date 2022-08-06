const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
module.exports = {
    name: "propozycje",
    cooldowns: 7000,
    description: "Zarządaj modułem propozycji",
    type: "CHAT_INPUT",
    perms: ["ADMINISTRATOR"],
    options: [
        {
            name: `kanal`,
            description: `Kanal propoyzcji`,
            type: `SUB_COMMAND`,
            options: [
                {
                    name: `kanal`,
                    description: `Kanał na którym będą formatowane propozycje`,
                    type: `CHANNEL`,
                    required: true
                }
            ]
        },
        {
            name: `status`,
            description: `Status propozycji (on/off)`,
            type: `SUB_COMMAND`,
            options: [
                {
                    name: `status`,
                    description: `Włącz lub wyłącz propozycje`,
                    type: `STRING`,
                    choices: [
                        {name: `Włącz`, value: `on`},
                        {name: `Wyłącz`, value: `off`}
                    ],
                }
            ]
        }
    ],
    run: async (client, interaction) => {
      let _sbc = interaction.options.getSubcommand()

      if(_sbc === `kanal`){
        let channel = interaction.options.getChannel(`kanal`)

        if(!channel.isText()){
            let embed = new MessageEmbed()
            .setTitle(`Wystąpił błąd...`)
            .setColor(client.config.primary)
            .setDescription(`Kanał propozycji musi być kanałem tekstowym`)

            return interaction.reply({
                embeds: [embed],
            })
        }

        await client.db.set(`guilds.${interaction.guild.id}.propozycje.channel`, channel.id)

        let embed = new MessageEmbed()
        .setTitle(`Wykonano zmiany!`)
        .setColor(client.config.primary)
        .setDescription(`${interaction.member} zmienił ustawienia propozycji!`)
        .addField(`Nowy kanał`, `${channel}`)

        return interaction.reply({
            embeds: [embed]
        })
      }

      if(_sbc === `status`){
        let status = interaction.options.getString(`status`)

        if(!status){
            status = await client.db.get(`guilds.${interaction.guild.id}.propozycje.status`)
            let channel = await client.db.get(`guilds.${interaction.guild.id}.propozycje.channel`)


            let embed = new MessageEmbed()
            .setTitle(`Ustawienia prpopozycji!`)
            .setColor(client.config.primary)
            .setDescription(`Na serwerze **${interaction.guild.name}** propozycje są \`${status === true ? `Włączone` : `Wyłączone`}\``)

            if(status === true){
                embed.addField(`Kanał`, `<#${channel}>`)
            }

            return interaction.reply({
                embeds: [embed]
            })
        }

        await client.db.set(`guilds.${interaction.guild.id}.propoyzcje.status`, status === `on` ? true : false)

        let embed = new MessageEmbed()
            .setTitle(`Wykonano zmiany!`)
            .setColor(client.config.primary)
            .setDescription(`${interaction.member} zmienił status propozycji!`)
            .addField(`Status`, `\`${status === `on` ? `Włączone` : `Wyłączone`}\``)

            return interaction.reply({
                embeds: [embed]
            })
      }
    },
};