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
        .addFields(
            {
                name: `Powitania i pożegnania`,
                value: `\`\`\`
                {user} - Pinguje użytkownika
                {user.name} - Wyświetlana nazwa użytkownika
                {user.tag} - Wyświetla nazwę i tag użytkownika (KvbuS#9999)
                {guild.name} - Wyświetla nazwę serwera
                {guild.members} - Wyświetla liczbę użytkowników na serwerze
                \`\`\`
                `
            }
        )

        interaction.reply({
            embeds: [embed]
        })
    },
};