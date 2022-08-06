const client = require("../index");
const {
   MessageEmbed,
   MessageActionRow,
   MessageSelectMenu,
   MessageButton
} = require("discord.js");
client.on("interactionCreate", async (interaction) => {
    if(!interaction.isButton()) return
    if(interaction.customId != `ticket`) return

    let guilddb = await client.db.get(`guilds.${interaction.guild.id}`)

    if(guilddb.tickety.status === false || !guilddb.tickety.status){
        return interaction.reply({
            content: `Tickety są obecnie wyłączone`,
            ephemeral: true
        })
    }

    let category = guilddb.tickety.category
    let role = guilddb.tickety.suprole

    let categoryObject = interaction.guild.channels.cache.get(category)
    // categoryObject.permissionOverwrites.create(interaction.guild.roles.everyone, { VIEW_CHANNEL: false, SEND_MESSAGES: false, READ_MESSAGE_HISTORY: false });

    let findChannel = interaction.guild.channels.cache.find(c => c.topic === `Ticket użytkownika <@${interaction.user.id}>`)

    if(findChannel){
        return interaction.reply({
            content: `Twój ticket jest już stworzony! Znajdziesz go tutaj: ${findChannel}`,
            ephemeral: true
        })
    }

    // if(role){
    //     categoryObject.permissionOverwrites.create(role, { VIEW_CHANNEL: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true });
    // }

    interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
        type: "GUILD_TEXT", //This create a text channel, you can make a voice one too, by changing "text" to "voice"
        parent: category,
        permissionOverwrites: [
            {
                id: interaction.guild.id,
                deny: ["VIEW_CHANNEL"],
            },
            {
                id: interaction.member.id,
                allow: [`VIEW_CHANNEL`],
            },
        ],
      }).then(async (channel) => {
        channel.setTopic(`Ticket użytkownika <@${interaction.user.id}>`)

        if(role){
            channel.permissionOverwrites.create(role, { VIEW_CHANNEL: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true });
        }

        interaction.reply({
            content: `Twój ticket został stworzony tutaj: ${channel}`,
            ephemeral: true
        })

        let hex = await client.db.get(`guilds.${interaction.guild.id}.tickety.hex`)

        let embed = new MessageEmbed()
        .setTitle(`Ticket użytkownika ${interaction.user.username}`)
        .setColor(hex != undefined ? hex : client.config.primary)
        .setDescription(`Właśnie stworzyłeś ticketa, poczekaj aż administrator ci odpowie`)
        .setThumbnail(interaction.user.avatarURL())

        let row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('close-ticket')
					.setLabel(`Zamknij ticket`)
					.setStyle('DANGER')
			);

        channel.send({
            embeds: [embed],
            components: [row]
        })
      })
})

client.on("interactionCreate", async (interaction) => {
    if(!interaction.isButton()) return
    if(interaction.customId != `close-ticket`) return

    if(!interaction.channel) return

    await interaction.reply({
        content: `Ticket zostanie usunięty za 5 sekund!`
    })
    
    setTimeout(() => {
        interaction.channel.delete()
    }, 5000)
})