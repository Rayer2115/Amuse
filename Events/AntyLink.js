// const client = require('..')
// const bannedLinks = require('../Data/System').bannedLinks
// const { MessageEmbed } = require('discord.js')

// client.on('messageUpdate', async (oldMessage, message) => {
//     if(!message.guild) return;
//     const psChannel = await client.db.get(`g${message.guild.id}.partnerstwa`)
//     const imageChannel = await client.db.get(`g${message.guild.id}.obrazki`)
//     const propsChannel = await client.db.get(`g${message.guild.id}.propozycje`)
//     const DisabledChannelArray = [
//         psChannel, imageChannel, propsChannel
//     ]
//     if(DisabledChannelArray.includes(message.channel.id)) return;
//     if(message.member.permissions.has("MANAGE_MESSAGES") || message.member.permissions.has("MANAGE_CHANNELS")) return;
//     const status = await client.db.get(`g${message.guild.id}.antylink`)
//     if(status === "false") return;
//     if(message.author.bot) return;

//     async function deleteMessage() {
//         message.delete()
        
//         const antiEmbed = new MessageEmbed()
//             .setColor(client.config.primary)
//             .setTitle("System anti-link")
//             .setFooter({
//                 text: `Invoked by: ${message.author.tag}`,
//                 iconURL: message.author.displayAvatarURL({
//                     dynamic: true
//                 })
//             })
//             .setDescription("Nie posiadasz uprawnień aby wysyłać tutaj linki!")
//             .addFields([
//                 { name: "Wymagane permisje:", value: "`ZARZĄDZANIE WIADOMOŚCIAMI` albo `ZARZĄDZANIE KANAŁAMI`" }
//             ])

//         const sent = await message.channel.send({
//             embeds: [antiEmbed]
//         })

//         setTimeout(() => {
//             sent.delete()
//         }, 15000)
//     }
    
//     for (const link of bannedLinks) {
        
//         if(message.content.includes(link)) return deleteMessage();
//     }
// })


// client.on("messageCreate", async (message) => {
//     if(!message.guild) return;
//     const psChannel = await client.db.get(`g${message.guild.id}.partnerstwa`)
//     const imageChannel = await client.db.get(`g${message.guild.id}.obrazki`)
//     const propsChannel = await client.db.get(`g${message.guild.id}.propozycje`)
//     const DisabledChannelArray = [
//         psChannel, imageChannel, propsChannel
//     ]
//     if(DisabledChannelArray.includes(message.channel.id)) return;
//     if(message.member.permissions.has("MANAGE_MESSAGES") || message.member.permissions.has("MANAGE_CHANNELS")) return;
//     const status = await client.db.get(`g${message.guild.id}.antylink`)
//     if(status === "false") return;
//     if(message.author.bot) return;

//     async function deleteMessage() {
//         message.delete()
        
//         const antiEmbed = new MessageEmbed()
//             .setColor(client.config.primary)
//             .setTitle("System anti-link")
//             .setFooter({
//                 text: `Invoked by: ${message.author.tag}`,
//                 iconURL: message.author.displayAvatarURL({
//                     dynamic: true
//                 })
//             })
//             .setDescription("Nie posiadasz uprawnień aby wysyłać tutaj linki!")
//             .addFields([
//                 { name: "Wymagane permisje:", value: "`ZARZĄDZANIE WIADOMOŚCIAMI` albo `ZARZĄDZANIE KANAŁAMI`" }
//             ])

//         const sent = await message.channel.send({
//             embeds: [antiEmbed]
//         })

//         setTimeout(() => {
//             sent.delete()
//         }, 15000)
//     }
    
//     for (const link of bannedLinks) {
        
//         if(message.content.includes(link)) return deleteMessage();
//     }
// })