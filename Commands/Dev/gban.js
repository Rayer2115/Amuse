const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
module.exports = {
    name: "gban",
    cooldowns: 1000,
    description: "[Dev] Wykonuje podany kod",
    type: "CHAT_INPUT",
    developersOnly: true,
    options: [
        {
            name: "serwer",
            description: "Nadaje blokadę na serwer",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "id",
                    description: "ID serwera",
                    type: "STRING",
                    required: true
                },
                {
                    name: "powód",
                    description: "Powód blokady",
                    type: "STRING",
                    required: true
                }
            ]
        },
        {
            name: "user",
            description: "Nadaje blokadę na użytkownika",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "id",
                    description: "ID użytkownika",
                    type: "STRING",
                    required: true
                },
                {
                    name: "powód",
                    description: "Powód blokady",
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

            let serwer = client.guilds.cache.find(g => g.id == id)

            if(!serwer){
                return interaction.reply({content: "Nie ma takiego serwera!", ephemeral: true})
            }

            serwer.leave()
            
            let powód = interaction.options.getString(`powód`)

            client.db.set(`g${id}.gban.reason`, powód)

            let suc = new MessageEmbed()
            .setTitle(`Nadano blokadę!`)
            .setColor(client.config.primary)
            .setDescription(`Blokada została nałożona na serwer o ID \`${id}\`\n**Powód:**\n\`${powód}\``)

            interaction.reply({embeds: [suc]})
        }
        if(_cmd == `user`){
            let id = interaction.options.getString(`id`)

            if(isNaN(id)){
                return interaction.reply({content: "ID musi być liczbą!", ephemeral: true})
            }
            
            let powód = interaction.options.getString(`powód`)

            client.db.set(`u${id}.gban.reason`, powód)

            let suc = new MessageEmbed()
            .setTitle(`Nadano blokadę!`)
            .setColor(client.config.primary)
            .setDescription(`Blokada została nałożona na użytkownika o ID \`${id}\`\n**Powód:**\n\`${powód}\``)

            interaction.reply({embeds: [suc]})
        }
        
    },
};