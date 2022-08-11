const Discord = require('discord.js')
module.exports = {
    name: "opinia",
    description: "Możesz ocenić bota uwu?",
    cooldowns: 7000,
    type: "CHAT_INPUT",
    options: [
        {
            name: `gwiazdki`,
            description: `1-5 na ile oceniasz bota`,
            type: `NUMBER`,
            required: true
        },
        {
            name: `opinia`,
            description: `Twoja opinia bota tzw. komentarz`,
            type: `STRING`,
            required: true
        }
    ],
    run: async (client, interaction, args) => {

        let stars = interaction.options.getNumber(`gwiazdki`)
        let comment = interaction.options.getString(`opinia`)
        let channel = client.channels.cache.get(`1007328834011537448`)

        if(stars < 1 || stars > 5){
            let errEmbed = new Discord.MessageEmbed()
            .setTitle(`Wystąpił błąd...`)
            .setColor(client.config.primary)
            .setDescription(`Możesz dać gwiazdki tylko w zakresie od 1 do 5!`)

            return interaction.reply({
                embeds: [errEmbed]
            })
        }

        let embed = new Discord.MessageEmbed()
        .setAuthor({name: `Opinia ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({dynamic: true})})
        
        if(stars === 1){
            embed.setDescription(`<:star:1007332270299942932>`)
        }
        if(stars === 2){
            embed.setDescription(`<:star:1007332270299942932> <:star:1007332270299942932>`)
        }
        if(stars === 3){
            embed.setDescription(`<:star:1007332270299942932> <:star:1007332270299942932> <:star:1007332270299942932>`)
        }
        if(stars === 4){
            embed.setDescription(`<:star:1007332270299942932> <:star:1007332270299942932> <:star:1007332270299942932> <:star:1007332270299942932>`)
        }
        if(stars === 5){
            embed.setDescription(`<:star:1007332270299942932> <:star:1007332270299942932> <:star:1007332270299942932> <:star:1007332270299942932> <:star:1007332270299942932>`)
        }

        embed.addField(`Opinia:`, `\`${comment}\``)

        channel.send({
            embeds: [embed]
        })
    }
}