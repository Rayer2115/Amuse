const client = require(`..`)

client.on("guildMemberAdd", async (member) => {
    let status = await client.db.get(`guilds.${member.guild.id}.autorolaStatus`)

    if(!status || status == false) return

    let role = await client.db.get(`guilds.${member.guild.id}.autorola`)

    if(!role || role == []) return

    role.forEach(rolaId => {
        let rola = member.guild.roles.cache.get(rolaId)

        member.roles.add(rola)
    })
})