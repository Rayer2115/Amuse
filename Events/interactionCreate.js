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

      const args = [];

      const developers = require(`../Data/Config.js`).developers

      const { MessageEmbed } = require('discord.js')
      const ms = require('ms')

      // let disabledCommands = client.db.get(`g${interaction.guild.id}.disabledCommands`)

      // if(!disabledCommands) disabledCommands = `brak`

      // if(disabledCommands.includes(command.name)){
      //    let errEmbed = new MessageEmbed()
      //    .setTitle(`Wystąpił błąd...`)
      //    .setColor(client.config.priamry)
      //    .setDescription(`Ta komenda jest wyłączona na tym serwerze!`)

      //    return interaction.reply({ embeds: [errEmbed], ephemeral: true })
      // }

      // let whitelist = require(`../Data/whitelist.json`).whitelisted

      // if(!whitelist.includes(interaction.guild.id)){
      //    let notWhEmbed = new MessageEmbed()
      //    .setTitle(`Wystąpił błąd...`)
      //    .setColor(client.config.primary)
      //    .setDescription(`Ten serwer nie posiada whitelist'y`)

      //    return interaction.reply({
      //       embeds: [notWhEmbed]
      //    })
      // }

      let gbanServerStatus = await client.db.get(`g${interaction.guild.id}.gban.reason`)

      if(gbanServerStatus && gbanServerStatus != false){

         let gbanEmbed = new MessageEmbed()
         .setTitle(`Wystąpił błąd...`)
         .setColor(client.config.primary)
         .setDescription(`Ten serwer posiada globalną blokadę za \`${gbanServerStatus}\``)

         return interaction.reply({embeds: [gbanEmbed]})
      }

      let gbanUserStatus = await client.db.get(`u${interaction.member.id}.gban.reason`)

      if(gbanUserStatus && gbanUserStatus != false){


         let gbanEmbed = new MessageEmbed()
         .setTitle(`Wystąpił błąd...`)
         .setColor(client.config.primary)
         .setDescription(`Posiadasz globalna blokadę za \`${gbanUserStatus}\``)

         return interaction.reply({embeds: [gbanEmbed]})
      }

      if (command.developersOnly) {
            if (!developers.includes(interaction.user.id)) {
               let toggleoff_embed = new MessageEmbed()
               .setTitle("Wystąpił błąd...")
               .setDescription(`Tylko developerzy bota mogą korzystać z tej komendy`)
               .setColor(client.config.primary)
            return interaction.reply({ embeds: [toggleoff_embed], ephemeral: true });
            }
         }
      
      if(command.premiumOnly){
         let premiumStatus = await client.db.get(`g${interaction.guild.id}.premium`)

         if(premiumStatus == false || !premiumStatus){

            let errEmbed = new MessageEmbed()
            .setTitle(`Wystąpił błąd...`)
            .setColor(client.config.primary)
            .setDescription(`Ta komenda wymaga statusu premium!`)

            return interaction.reply({embeds: [errEmbed], ephemeral:true})
         }
      }
      
      if (!interaction.member.permissions.has(command.perms || [])) {
         let toggleoff_embed = new MessageEmbed()
            .setTitle("Wystąpił błąd...")
            .setDescription(`Ta komenda do uruchomienia wymaga permisji \`${command.perms.join("`, `")}\``)
            .setColor(client.config.primary)
         return interaction.reply({ embeds: [toggleoff_embed], ephemeral: true });
      }

      if (command.cooldowns) {
         if (client.cooldowns.has(`${command.name}${interaction.user.id}`)) {
            let toggleoff_embed = new MessageEmbed()
               .setTitle("Wystąpił błąd...")
               .setDescription(`Aby uruchomić tą komendę jeszcze raz musisz poczekać: \`${ms(
                  client.cooldowns.get(`${command.name}${interaction.user.id}`) -
                     Date.now(),
                  { long: false }
               )}\``)
               .setColor(client.config.primary)
            return interaction.reply({ embeds: [toggleoff_embed], ephemeral: true });
               }
         client.cooldowns.set(
            `${command.name}${interaction.user.id}`,
            Date.now() + command.cooldowns
         );
   
         setTimeout(() => {
            client.cooldowns.delete(`${command.name}${interaction.user.id}`);
         }, command.cooldowns);
      }

      for (let option of interaction.options.data) {
         if (option.type === "SUB_COMMAND") {
            if (option.name) args.push(option.name);
            option.options?.forEach((x) => {
               if (x.value) args.push(x.value);
            });
         } else if (option.value) args.push(option.value);
      }
      interaction.member = interaction.guild.members.cache.get(
         interaction.user.id
      );

      command.run(client, interaction, args);
   }
});