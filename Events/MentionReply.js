const { MessageEmbed } = require("discord.js")
const client = require(`..`)
const moment = require("moment");
require("moment-duration-format");
const packageJSON = require("../package.json");

let both = ["messageCreate", "messageUpdate"]

both.forEach(event => {
    client.on(event, async (message, newMessage) => {
        newMessage = message
        if(!message.mentions.users.has(client.user.id)) return
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let embed = new MessageEmbed()
        .setTitle(`Informacje o ${client.user.username}`)
        .setColor(client.config.primary)
        .setDescription(`
        ${client.user.username} - Wielofunkcyjny bot który zabezpieczy twój serwer i pomoże go moderować

        **\`🤖\` Informacje:**
        > Serwery:  \`${client.guilds.cache.size}\`
        > UpTime: \`${days}:${hours}:${minutes}:${seconds}\`
        > NodeJS: \`${process.version.substring(undefined, 3)}\`
        > Discord.js: \`${packageJSON.dependencies["discord.js"].substring(1, undefined)}\`

        **\`🔗\` Linki:**
        > **[Serwer Support](https://discord.gg/xMhyHznJAu)**
        `)
        .setThumbnail(client.user.avatarURL())

        message.reply({
            embeds: [embed]
        })
    })
})