const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
module.exports = {
    name: "vars",
    cooldowns: 2000,
    description: "Zmienne w bocie które możecie użyć",
    type: "CHAT_INPUT",
    run: async (client, interaction) => {
        let embed = new MessageEmbed()
        .setTitle(`Zmienne`)
        .setColor(client.config.primary)
        .setDescription(`\`\`\`Narazie brak zmiennych\`\`\``)

        interaction.reply({
            embeds: [embed]
        })
    },
};