const moment = require('moment')
const time = moment().format("[[]DD-MM-YYYY HH:mm:ss[]]")
const colors = require('chalk')
const client = require(`..`)

module.exports = {
    cmd: (response) => {
        console.log(colors.gray(time), colors.bgGray(" CMD "), response)
        // const consoleChannel = client.channels.cache.get(`1003614088569573427`)
        // consoleChannel.send(`**CMD** ${response}`)
    },
    log: (response) => {
        console.log(colors.gray(time), colors.bgBlue(" LOG "), response)
        // const consoleChannel = client.channels.cache.get(`1003614088569573427`)
        // consoleChannel.send(`**LOG** ${response}`)
    },
    error: (response) => {
        console.log(colors.gray(time), colors.bgRed(" ERROR "), response)
        // const consoleChannel = client.channels.cache.get(`1003614088569573427`)
        // consoleChannel.send(`**ERROR** ${response}`)
    },
    warn: (response) => {
        console.log(colors.gray(time), colors.bgYellow(" WARN "), response)
        // const consoleChannel = client.channels.cache.get(`1003614088569573427`)
    },
    load: (response) => {
        console.log(colors.gray(time), colors.bgMagenta(" LOAD "), response)
        // const consoleChannel = client.channels.cache.get(`1003614088569573427`)
        // consoleChannel.send(`**LOAD** ${response}`)
    },
    web: (response) => {
        console.log(colors.gray(time), colors.bgGreen(" EXPRESS "), response)
    }
}