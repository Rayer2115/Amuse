const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
module.exports = {
    name: "guban",
    cooldowns: 1000,
    description: "[Dev] Wykonuje podany kod",
    type: "CHAT_INPUT",
    developersOnly: true,
    options: [
        {
            name: "serwer",
            description: "Zdejmuje blokadę na serwer",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "id",
                    description: "ID serwera",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "user",
            description: "Zdejmuje blokadę na użytkownika",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "id",
                    description: "ID użytkownika",
                    type: "STRING",
                    required: true
                }
            ]
        }
    ],
    run: async (client, interaction) => {
        let _cmd = interaction.options.getSubcommand()

        if(_cmd == `serwer`){
            let id = interaction.options.getString(`id`)

            if(isNaN(id)){
                return interaction.reply({content: "ID musi być liczbą!", ephemeral: true})
            }

            client.db.set(`g${id}.gban.reason`, false)

            let suc = new MessageEmbed()
            .setTitle(`Nadano blokadę!`)
            .setColor(client.config.primary)
            .setDescription(`Blokada została zdjęta z serwera o ID \`${id}\``)

            interaction.reply({embeds: [suc]})
        }
        if(_cmd == `user`){
            let id = interaction.options.getString(`id`)

            if(isNaN(id)){
                return interaction.reply({content: "ID musi być liczbą!", ephemeral: true})
            }
            
            
            client.db.set(`u${id}.gban.reason`, false)

            let suc = new MessageEmbed()
            .setTitle(`Nadano blokadę!`)
            .setColor(client.config.primary)
            .setDescription(`Blokada została zdjęta z użytkownika o ID \`${id}\``)

            interaction.reply({embeds: [suc]})
        }
        
    },
};