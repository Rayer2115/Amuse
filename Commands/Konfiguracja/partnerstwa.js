const Discord = require('discord.js')
module.exports = {
    name: "partnerstwa",
    description: "Zarządzaj modułem propoyzcji",
    cooldowns: 7000,
    type: "CHAT_INPUT",
    perms: ["ADMINISTRATOR"],
    options: [
        {
            name: `konfiguracja`,
            description: `Skonfiguruj moduł partnerstw`,
            type: `SUB_COMMAND_GROUP`,
            options: [
                {
                    name: `kanal`,
                    description: `Kanał na którym są wysyłane partnerstwa`,
                    type: `SUB_COMMAND`,
                    options: [
                        {
                            name: `kanal`,
                            description: `Umiesz czytać?`,
                            type: `CHANNEL`,
                            required: true
                        }
                    ]
                },
                {
                    name: `rola`,
                    description: `Rola która będzie nadawana partnerom`,
                    type: `SUB_COMMAND`,
                    options: [
                        {
                            name: `rola`,
                            description: `Umiesz czytać?`,
                            type: `ROLE`,
                            required: true
                        }
                    ]
                },
                {
                    name: `status`,
                    description: `Włącz/wyłącz partnerstwa`,
                    type: `SUB_COMMAND`,
                    options: [
                        {
                            name: `status`,
                            description: `Włącz lub wyłącz propozycje`,
                            type: `STRING`,
                            choices: [
                                {name: `Włącz`, value: `on`},
                                {name: `Wyłącz`, value: `off`}
                            ],
                        }
                    ]
                }
            ]
        },
        {
            name: `zarządzaj`,
            description: `Zarządzaj partnerstwamo danej osoby`,
            type: `SUB_COMMAND_GROUP`,
            options: [
                {
                    name: `dodaj`,
                    description: `Dodaj użytkownikowi partnerstwa`,
                    type: `SUB_COMMAND`,
                    options: [
                        {
                            name: `użytkownik`,
                            description: `Użytkownik którego dodajesz partnerstwa`,
                            type: `USER`,
                            required: true
                        },
                        {
                            name: `liczba`,
                            description: `Liczba partnerstw jaką chcesz dodać użytkownikowi`,
                            type: `NUMBER`,
                            required: true
                        }
                    ]
                },
                {
                    name: `usuń`,
                    description: `Usuń użytkownikowi partnerstwa`,
                    type: `SUB_COMMAND`,
                    options: [
                        {
                            name: `użytkownik`,
                            description: `Użytkownik któremu usuwasz partnerstwa`,
                            type: `USER`,
                            required: true
                        },
                        {
                            name: `liczba`,
                            description: `Liczba partnerstw jaką chcesz usunąć użytkownikowi`,
                            type: `NUMBER`,
                            required: true
                        }
                    ]
                },
                {
                    name: `reset`,
                    description: `Usuń użytkownikowi wszystkie partnerstwa`,
                    type: `SUB_COMMAND`,
                    options: [
                        {
                            name: `użytkownik`,
                            description: `Użytkownik któremu usuwasz wszystkie partnerstwa`,
                            type: `USER`,
                            required: true
                        },
                    ]
                }
            ]
        }
    ],
    run: async (client, interaction, args) => {
        let grp = interaction.options.getSubcommandGroup()

        if(grp === `konfiguracja`){
            let sbc = interaction.options.getSubcommand()

            if(sbc === `kanal`){
                let channel = interaction.options.getChannel(`kanal`)

                if(!channel.isText()){
                    let errEmbed = new Discord.MessageEmbed()
                    .setTitle(`Wystąpił bład...`)
                    .setColor(client.config.primary)
                    .setDescription(`Kanał partnerstw musi być kanałem tekstowym!`)

                    return interaction.reply({
                        embeds: [errEmbed]
                    })
                }

                await client.db.set(`guilds.${interaction.guild.id}.partnerstwa.channel`, channel.id)

                let embed = new Discord.MessageEmbed()
                .setTitle(`Wykonano zmiany!`)
                .setColor(client.config.primary)
                .setDescription(`${interaction.member} zmienił ustawienia partnerstw!`)
                .addField(`Nowy kanał`, `${channel}`)

                return interaction.reply({
                    embeds: [embed]
                })
            }
            if(sbc === `rola`){
                let rola = interaction.options.getRole(`rola`)

                if(!rola.editable){
                    let errEmbed = new Discord.MessageEmbed()
                    .setTitle(`Wystąpił bład...`)
                    .setColor(client.config.primary)
                    .setDescription(`Nie mam dostepu do tej roli!`)

                    return interaction.reply({
                        embeds: [errEmbed]
                    })
                }

                await client.db.set(`guilds.${interaction.guild.id}.partnerstwa.role`, rola.id)

                let embed = new Discord.MessageEmbed()
                .setTitle(`Wykonano zmiany!`)
                .setColor(client.config.primary)
                .setDescription(`${interaction.member} zmienił ustawienia partnerstw!`)
                .addField(`Nowa rola`, `${rola}`)

                return interaction.reply({
                    embeds: [embed]
                })
            }
            if(sbc === `status`){
                let status = interaction.options.getString(`status`)

                if(!status){
                    status = await client.db.get(`guilds.${interaction.guild.id}.partnerstwa.status`)
                    let channel = await client.db.get(`guilds.${interaction.guild.id}.partnerstwa.channel`)
                    let rola = await client.db.get(`guilds.${interaction.guild.id}.partnerstwa.role`)

                    let embed = new Discord.MessageEmbed()
                    .setTitle(`Ustawienia partnerstw!`)
                    .setColor(client.config.primary)
                    .setDescription(`Na serwerze **${interaction.guild.name}** partnerstwa są \`${status === true ? `Włączone` : `Wyłączone`}\``)

                    if(status === true){
                        embed.addField(`Kanał`, `<#${channel}>`, true)
                    }
                    if(rola){
                        embed.addField(`Rola`, `<@&${rola}>`, true)
                    }

                    return interaction.reply({
                        embeds: [embed]
                    })
                }

                await client.db.set(`guilds.${interaction.guild.id}.partnerstwa.status`, status === `on` ? true : false)

                let embed = new Discord.MessageEmbed()
                .setTitle(`Wykonano zmiany!`)
                .setColor(client.config.primary)
                .setDescription(`${interaction.member} zmienił status partnerstw!`)
                .addField(`Status`, `\`${status === `on` ? `Włączone` : `Wyłączone`}\``)

                return interaction.reply({
                    embeds: [embed]
                })
            }
        }

        if(grp === `zarządzaj`){
            let sub = interaction.options.getSubcommand()
            
            if(sub === `dodaj`){
                let member = interaction.options.getMember(`użytkownik`)
                let number = interaction.options.getNumber(`liczba`)

                if(number < 1){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`Wystąpił błąd...`)
                    .setColor(client.config.primary)
                    .setDescription(`Nie możesz dodać zerowych lub minusowych partnerstw!`)

                    return interaction.reply({
                        embeds: [embed]
                    })
                }

                await client.db.add(`guilds.${interaction.guild.id}.partnerstwa.${member.id}`, number)

                let embed  =new Discord.MessageEmbed()
                .setTitle(`Dodano!`)
                .setColor(client.config.primary)
                .setDescription(`${interaction.member} dodał \` ${number} \` partnerstw dla ${member}`)

                return interaction.reply({
                    embeds: [embed]
                })
            }

            if(sub === `usuń`){
                let member = interaction.options.getMember(`użytkownik`)
                let number = interaction.options.getNumber(`liczba`)

                if(number < 1){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`Wystąpił błąd...`)
                    .setColor(client.config.primary)
                    .setDescription(`Nie możesz odjąć zerowych lub minusowych partnerstw!`)

                    return interaction.reply({
                        embeds: [embed]
                    })
                }

                let numberBefore = await client.db.get(`guilds.${interaction.guild.id}.partnerstwa.${member.id}`)

                if(number > numberBefore){
                    let embed = new Discord.MessageEmbed()
                    .setTitle(`Wystąpił błąd...`)
                    .setColor(client.config.primary)
                    .setDescription(`Nie możesz odjąć więcej partnerstw niż zrobił użytkownik!`)

                    return interaction.reply({
                        embeds: [embed]
                    })
                }

                await client.db.sub(`guilds.${interaction.guild.id}.partnerstwa.${member.id}`, number)

                let embed  =new Discord.MessageEmbed()
                .setTitle(`Odjęto!`)
                .setColor(client.config.primary)
                .setDescription(`${interaction.member} odjął \` ${number} \` partnerstw dla ${member}`)

                return interaction.reply({
                    embeds: [embed]
                })
            }

            if(sub === `reset`){
                let member = interaction.options.getMember(`użytkownik`)
                let number = await client.db.get(`guilds.${interaction.guild.id}.partnerstwa.${member.id}`)


                await client.db.sub(`guilds.${interaction.guild.id}.partnerstwa.${member.id}`, number - 1)

                let embed  =new Discord.MessageEmbed()
                .setTitle(`Zresetowano!`)
                .setColor(client.config.primary)
                .setDescription(`${interaction.member} zresetował partnerstwa dla ${member}`)

                return interaction.reply({
                    embeds: [embed]
                })
            }
        }
    }
}