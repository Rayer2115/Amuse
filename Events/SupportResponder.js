const client = require(`..`)

client.on(`messageCreate`, async (message) => {
    if(message.guild.id == `780352528163930122`){

        if(message.channel.id != `1004083706648084521`) return

        if(message.author.bot) return

        if(message.content.toLowerCase().includes(`addbot`) || message.content.toLowerCase().includes(`dodaj`)){
            message.reply(`https://i.imgur.com/NoQFVfi.png`)
        }
        if(message.content.toLowerCase().includes(`autorola`)){
            message.reply(`Aby ustawić autorolę należy wpisać \` /autorola dodaj \` natomiast aby ją włączyc lub wyłączyć \` /autorola status \``)
        }
        if(message.content.toLowerCase().includes(`dev`)){
            message.reply(`Aby wejść w tryb developera musisz wejść w ustawienia (https://i.imgur.com/dF6cRtp.png) a następnie w zaawansowane gdzie masz ustawienia "TRYB DEVELOPERA" (https://i.imgur.com/etXkd16.png)`)
        }
    }
})