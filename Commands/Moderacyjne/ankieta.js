const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
module.exports = {
    name: "ankieta",
    cooldowns: 2000,
    description: "Wysyła ankietę na kanał",
    perms: ["MANAGE_MESSAGES"],
    type: "CHAT_INPUT",
    options: [
        {
            name: `treść`,
            description: `Treść ankiety`,
            type: `STRING`,
            required: true
        }
    ],
    run: async (client, interaction) => {
      let treść = interaction.options.getString(`treść`)

      let embed = new MessageEmbed()
      .setTitle(`Czas na ankietę!`)
      .setColor(client.config.primary)
      .setDescription(treść)
      .setFooter({text: `Zareaguj w emotkę!`})

      interaction.reply({
        content: `Wysyłam ankietę...`,
        ephemeral: true
      }).then(() => {
        interaction.channel.send({
            embeds: [embed]
        }).then(message => {
            interaction.editReply({
                content: `Poprawnie dodano ankietę!`
            })
            message.react(`<:tak:1001127925657124904>`)
            message.react(`<:moze:1001127928349872190>`)
            message.react(`<:nie:1001127927188041888>`)
        })
      })
      .catch((err) => {
        interaction.editReply({
            content: `Nie udało wysłać się ankiety!`
        })
      })
    },
};