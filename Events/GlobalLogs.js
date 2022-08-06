const client = require("../index");
const {
   MessageEmbed,
   MessageActionRow,
   MessageSelectMenu,
} = require("discord.js");
client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        const command = client.slashCommands.get(interaction.commandName);
          
        if (!command)
           return interaction.reply({ content: "Wystąpił problem." });

           let logChannel = client.channels.cache.find(c => c.id === `1005539511222145024`)
           
           let logMessage = `**${interaction.user.tag}** \`(${interaction.user.id})\` użył komendy  \`/${command.name}\` na serwerze **${interaction.guild.name}** \`(${interaction.guild.id})\` na kanale **${interaction.channel.name}** \`(${interaction.channel.id})\``
           
           
           logChannel.send(logMessage)

    }
})

// client.on("messageCreate", async (message) => {

//     if(message.author.bot) return

//     let logChannel = client.channels.cache.find(c => c.id === `1003611450490769418`)

//     let invite =await  message.channel.createInvite()
           
//     let logMessage = `**${message.author.tag}** napisał: ${message.content}\nNa serwerze **${message.guild.name}** ${invite.url}`
    
    
//     logChannel.send(logMessage)
// })