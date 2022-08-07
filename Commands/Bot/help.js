const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
module.exports = {
    name: "help",
    cooldowns: 7000,
    description: "Komenda pomocy",
    type: "CHAT_INPUT",
    run: async (client, interaction) => {
        let arrayOfDevCommands = [
            "eval",
            "gban",
            "guban",
        ]
        let arrayOfModCommands = [
            "ban",
            "kick",
            'clear',
            "ankieta",
        ]
        let arrayOfConfCommands = [
            "autorola",
            "ticket",
            "tickety",
            "nowosci",
            "backup",
            "lobby"
        ]
        let arrayOfInfoCommands = [
            "help",
            "vars"
        ]



      let embed = new MessageEmbed()
      .setTitle(`Panel pomocy ${client.user.username}`)
      .setColor(client.config.primary)
      .setThumbnail(client.user.avatarURL())
      .setDescription(`**${client.user.username}** posiada \`${arrayOfDevCommands.length + arrayOfInfoCommands.length + arrayOfModCommands.length + arrayOfConfCommands.length}\` komend\nPrefix na tym serwerze to \`/\` (Slash)`)
      .addFields(
        {
            name: `Moderacyjne`,
            value: `\`${arrayOfModCommands.join(`, `)}\``
        },
        {
            name: `Konfiguracyjne`,
            value: `\`${arrayOfConfCommands.join(`, `)}\``
        },
        {
            name: `Bot`,
            value: `\`${arrayOfInfoCommands.join(`, `)}\``
        },
        {
            name: `Dev`,
            value: `\`${arrayOfDevCommands.join(`, `)}\``
        },
      )

      interaction.reply({
        embeds: [embed]
      })
    },
};