const Discord = require('discord.js')

module.exports = {
    name: "help",
    description: "Wyświetla podstawową pomoc",
    /**
     * @param {Discord.Client} client
     * @param {Discord.Interaction} interaction
     */
    run: async (client, interaction, args) => {
        const directories = [
            ...new Set(client.slashCommands.map((cmd) => cmd.directory)),
        ];
        const formatString = (str) => {
            return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
        };

        const categories = directories.map((dir) => {
            const getCommands = client.slashCommands
                .filter((cmd) => cmd.directory === dir)
                .map((cmd) => {
                    return {
                        name: cmd.name,
                        description: cmd.description
                };
            });

            return {
                directory: formatString(dir),
                commands: getCommands,
            };
        });

      const embed = new Discord.MessageEmbed()
         .setAuthor({
            name: "Podstawowa Pomoc",
            iconURL: client.user.avatarURL()
         })
         .setDescription(
            `Witaj **${interaction.user.username}**, nazywam się \` ${client.user.username} \` i pomogę ci.\nWybierz kategorię z listy!`
         )
         .setColor(client.config.primary)
         .setTimestamp()
         .setThumbnail(client.user.avatarURL())

      const components = (state) => [
         new Discord.MessageActionRow().addComponents(
            new Discord.MessageSelectMenu()
               .setCustomId("help-menu")
               .setPlaceholder("Wybierz moduł!")
               .setDisabled(state)
               .addOptions([
                  categories.map((cmd) => {
                     return {
                        label: `${cmd.directory}`,
                        value: `${cmd.directory.toLowerCase()}`,
                        description:
                           `Kliknij po więcej informacji`,
                     };
                  }),
               ])
         ),
      ];

      const inMessage = await interaction.reply({
         embeds: [embed],
         components: components(false),
      });

      const filter = (interactio) => interactio.user.id === interaction.user.id;

      const collector = interaction.channel.createMessageComponentCollector({
         filter,
         componentType: "SELECT_MENU",
         time: 60000,
      });

      collector.on("collect", (interactio) => {
         const [directory] = interactio.values;
         const category = categories.find(
            (x) => x.directory.toLowerCase() === directory
         );

         const embed2 = new Discord.MessageEmbed()
            .setAuthor({ name: `${directory.charAt(0).toUpperCase()}${directory.slice(1).toLowerCase()}`, iconURL: client.user.avatarURL()})
            .setDescription(
               "" + category.commands.map((cmd) => `\`/${cmd.name}\` - ${cmd.description}`).join("\n ")
            )
            .setColor(client.config.primary);

         interactio.update({ embeds: [embed2] });
      });   
    }
}