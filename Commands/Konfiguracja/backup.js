const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
const backup = require("discord-backup");
backup.setStorageFolder("C:/Users/N3gat/Documents/Rusty/Data/Backups");
module.exports = {
    name: "backup",
    cooldowns: 7000,
    description: "Zarządzaj swoimi backup'ami",
    type: "CHAT_INPUT",
    perms: ["ADMINISTRATOR"],
    options: [
        {
            name: `stwórz`,
            description: `Tworzy nowego backup'a!`,
            type: `SUB_COMMAND`
        },
        {
            name: `lista`,
            description: `Pokazuje wszystkie stworzone backup'y`,
            type: `SUB_COMMAND`
        },
        {
            name: `zaladuj`,
            description: `Ładuje backup'a`,
            type: `SUB_COMMAND`,
            options: [
                {
                    name: `id`,
                    description: `Id backup'a`,
                    type: `STRING`,
                    required: true
                }
            ]
        },
    ],
    run: async (client, interaction) => {
      let _sbc = interaction.options.getSubcommand()

      if(_sbc === `stwórz`){
        let waitembed = new MessageEmbed()
        .setTitle(`Tworze backup'a....`)
        .setColor(client.config.primary)

        interaction.reply({
            embeds: [waitembed]
        })
        await backup.create(interaction.guild, {
            maxMessagesPerChannel: 10,
            jsonSave: true,
            jsonBeautify: true,
            saveImages: "base64"
        }).then(async (backupData) => {
            await client.db.push(`guilds.${interaction.guild.id}.backups`, backupData.id)
            let embed = new MessageEmbed()
            .setTitle(`Pomyślnie stworzono backup'a!`)
            .setDescription(`Backup został stworzony i jest on dostępny o ID **\` ${backupData.id} \`**`)
            .setColor(client.config.primary)

            interaction.editReply({
                embeds: [embed]
            })
        });
      }

      if(_sbc === `lista`){
        let backupArray = await client.db.get(`guilds.${interaction.guild.id}.backups`)

        if(!backupArray || backupArray === []){
            return interaction.reply(`Ten serwer nie posiada żadnych backup'ów!`)
        }

        let embed = new MessageEmbed()
        .setTitle(`Lista backup'ów`)
        .setColor(client.config.primary)
        .setDescription(`\`\`\`\n${backupArray.join(`,\n`)}\`\`\``)

        return interaction.reply({
            embeds: [embed]
        })

        // backupArray.forEach(async (backupID) => {

        // })
      }

      if(_sbc === `zaladuj`){
        let id = interaction.options.getString(`id`)

        await backup.load(id, interaction.guild, {
            clearGuildBeforeRestore: true
        }).then(async () => {
            await client.db.pull(`guilds.${interaction.guild.id}.backups`, id)
        }).catch(() => {
            interaction.reply(`Nie znaleziono takiego backup'a`)
        })
      }
    },
};