const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
module.exports = {
    name: "clear",
    cooldowns: 3000,
    description: "Czyści wiadomości na kanale",
    type: "CHAT_INPUT",
    perms: ["MANAGE_MESSAGES"],
    options: [
        {
            name: `liczba`,
            description: `Liczba wiadomości do usunięcia`,
            type: `NUMBER`,
            required: true
        }
    ],
    run: async (client, interaction) => {
      let number = interaction.options.getNumber(`liczba`)

      if(number < 1){
        let embed = new MessageEmbed()
        .setTitle(`Wystąpił błąd...`)
        .setColor(client.config.primary)
        .setDescription(`Liczba nie może być mniejsza od \`1\``)

        return interaction.reply({
            embeds: [embed]
        })
      }

      if(number > 100){
        let embed = new MessageEmbed()
        .setTitle(`Wystąpił błąd...`)
        .setColor(client.config.primary)
        .setDescription(`Liczba nie może być większa od \`100\``)

        return interaction.reply({
            embeds: [embed]
        })
      }

      await interaction.channel.bulkDelete(number)

      let embed = new MessageEmbed()
      .setTitle(`Wyczyszczono!`)
      .setColor(client.config.primary)
      .setDescription(`${interaction.member} wyczyścił **\`${number}\`** wiadomości w ${interaction.channel}`)

      interaction.reply({
        embeds: [embed]
      })
    },
};