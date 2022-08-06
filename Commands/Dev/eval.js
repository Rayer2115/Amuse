const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
module.exports = {
    name: "eval",
    cooldowns: 1000,
    description: "[Dev] Wykonuje podany kod",
    type: "CHAT_INPUT",
    developersOnly: true,
    options: [
        {
            name: "args",
            description: "Arg1",
            type: "STRING",
            required: true
        }
    ],
    run: async (client, interaction) => {
      let code = interaction.options.getString(`args`)

      if(code.includes(`client.token`)){
        return interaction.reply({
            content: "Nie tym razem"
        })
      }

      try {
        let evaled =  await eval(code)
        // let cleaned = await clean(evaled);

        let embed = new MessageEmbed()
        .setTitle(`Poprawnie wywołano kod!`)
        .setColor(client.config.primary)
        .addField(`INPUT`, `\`\`\`js\n${code}\`\`\``)
        .addField(`OUTPUT`, `\`\`\`js\n${evaled}\`\`\``)

        interaction.reply({
            embeds: [embed]
        })
      } catch (err) {

        let embed = new MessageEmbed()
        .setTitle(`Coś poszło nie tak!`)
        .setColor(client.config.primary)
        .addField(`INPUT`, `\`\`\`js\n${code}\`\`\``)
        .addField(`ERROR`, `\`\`\`js\n${err}\`\`\``)
        interaction.reply({
            embeds: [embed]
        })
      }

    },
};