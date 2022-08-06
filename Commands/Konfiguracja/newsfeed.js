const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
module.exports = {
    name: "nowosci",
    cooldowns: 7000,
    description: "Ustaw informacje o nowościach w bocie",
    type: "CHAT_INPUT",
    perms: ["ADMINISTRATOR"],
    options: [
        {
            name: `kanal`,
            description: `Wybierz kanał na którym będą pojawiały się nowości o bocie :>`,
            type: `SUB_COMMAND`,
            options: [
                {
                    name: `kanał`,
                    description: `Kanał na którym pojawią się nowości`,
                    type: `CHANNEL`,
                    required: true
                }
            ]
        },
        {
            name: `status`,
            description: `Status powiadomień (on/off)`,
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
    run: async (client, interaction) => {
        let _sbc = interaction.options.getSubcommand()

        if(_sbc === `kanal`){
            let channel = interaction.options.getChannel(`kanał`)

            if(!channel.isText()){
                let embed = new MessageEmbed()
                .setTitle(`Wystapił błąd...`)
                .setColor(client.config.primary)
                .setDescription(`Kanał nowości musi być kanałem tekstowym!`)

                return interaction.reply({
                    embeds: [embed]
                })
            }

            await client.db.set(`guilds.${interaction.guild.id}.newsChannel`, channel.id)

            let embed = new MessageEmbed()
            .setTitle(`Wykonano zmiany!`)
            .setColor(client.config.primary)
            .setDescription(`${interaction.member} zmienił ustawienia nowości!`)
            .addField(`Nowy kanał`, `${channel}`)

            return interaction.reply({
                embeds: [embed]
            })
        }

        if(_sbc === `status`){
            let opcja = interaction.options.getString(`status`)

            if(!opcja){
                opcja = await client.db.get(`guilds.${interaction.guild.id}.newsChannelStatus`)
                let channel = await client.db.get(`guilds.${interaction.guild.id}.newsChannel`)

                let embed = new MessageEmbed()
                .setTitle(`Ustawienia nowości!`)
                .setColor(client.config.primary)
                .setDescription(`Na serwerze **${interaction.guild.name}** nowości są \`${opcja === true ? `Włączone` : `Wyłączone`}\``)
                
                if(opcja === true){
                    embed.addField(`Kanał nowości`, `<#${channel}>`)
                }

                return interaction.reply({
                    embeds: [embed]
                })
            }

            await client.db.set(`guilds.${interaction.guild.id}.newsChannelStatus`, opcja === `on` ? true : false)
            
            let embed = new MessageEmbed()
            .setTitle(`Wykonano zmiany!`)
            .setColor(client.config.primary)
            .setDescription(`${interaction.member} zmienił status nowości!`)
            .addField(`Status`, `\`${opcja === `on` ? `Włączone` : `Wyłączone`}\``)

            return interaction.reply({
                embeds: [embed]
            })

        }
    },
};