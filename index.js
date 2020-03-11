const Discord = require('discord.js')
const bot = new Discord.Client()
const prefix = 'dss.'

//Connection Phase
bot.login('Njg2OTQ1NTE0MTg4NDM5NTcz.XmkpTw.R6pycYSfwnY57MzUPZOGhH_LPdE')
bot.on('ready', function () {
    console.log("Je suis connecté ! \nI'm connected !")
})


//When a user arrive on our server...
bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send(`Bienvenue sur mon serveur ${member.displayName}! / Welcome on my server ${member.displayName}!`)
    }).catch(console.error)
})

// Create an event listener for messages in order to display the url of their avatar
bot.on('message', message => {
    // If the message is "prefix+avatar"
    if (message.content.startsWith(`${prefix}avatar`)) {
        //We get the user mentionned
        const taggedUser = message.mentions.users.first()
        // If didn't mentione someone, return error
        if (!message.mentions.users.size) {
            return message.reply("Vous avez besoin de tager un utilisateur pour voir son avatar! / You need to tag a user in order to show his own avatar!")
        }else{
        // Send the user's avatar URL
        return message.reply(message.author.displayAvatarURL())
        }
    }
    // If the message is "prefix+member"
    if (message.content === `${prefix}member`) {
        // Send the numbers of members on your server
        return message.reply(`Il y'a actuellement ${Discord.Intents.FLAGS.GUILD_MEMBERS} membres sur ton serveur / There is ${Discord.Intents.FLAGS.GUILD_MEMBERS} members on your server`)
    }

    // If the message start with "prefix+user"
    if (message.content.startsWith(`${prefix}user`)) {
        //We get the user mentionned
        const taggedUser = message.mentions.users.first()
        // If didn't mentione someone, return error
        if (!message.mentions.users.size) {
            return message.reply("Vous avez besoin de tager un utilisateur pour voir ses infos! / You need to tag a user in order to show his infos!")
        }else{
        let userID = message.mentions.users.first().id
        console.log(message.member)
        // let serverOwner = message.guild.owner
        // let humans = message.guild.members.cache.filter(member => !member.user.bot).size
        // let bots = message.guild.members.cache.filter(member => member.user.bot).size
        // let onlineCount = message.guild.members.cache.filter(member => member.presence.status === 'online').size
        let botImg = bot.user.avatarURL()
        let user = message.author
        let userIcon = message.author.avatarURL()
        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Informations sur / Informations about: ${taggedUser.username}`)
            .setDescription(`Voici les informations générales sur: ${taggedUser.username} \nThere you are, this is the general informations about: ${taggedUser.username}`)
            .setThumbnail(botImg)
            .addField('ID: ', userID)
            // .addField('Status du robot / Bot Status', bot.user.presence.status)
            // .addField("Nombres de membres / member's number", Discord.Intents.FLAGS.GUILD_MEMBERS)
            // .addField("Nombres d'humains / Human's number", humans)
            // .addField("Nombres de robots / Bot's number", bots)
            // .addField("Nombres de personnes en ligne / Number of folks online", onlineCount)
            // .addField('Propriétaire du serveur / Server owner', serverOwner)
            .setTimestamp()
            .setFooter(`Auteur/Author: @${user.username + '#' + user.discriminator}`, `${userIcon}`);
        return message.channel.send(embed)
        }
    }

    // If the message is "prefix+info"
    if (message.content === `${prefix}info`) {
        let serverID = message.guild.id
        let serverOwner = message.guild.owner
        let humans = message.guild.members.cache.filter(member => !member.user.bot).size
        let bots = message.guild.members.cache.filter(member => member.user.bot).size
        let onlineCount = message.guild.members.cache.filter(member => member.presence.status === 'online').size
        let botImg = bot.user.avatarURL()
        let user = message.author
        let userIcon = message.author.avatarURL()
        let embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Stats Serveur / Server Stats")
            .setDescription('Voici les informations générales de votre serveur\nThere you are, this is the general informations of your server')
            .setThumbnail(botImg)
            .addField('ID du serveur / Server ID', serverID)
            .addField('Status du robot / Bot Status', bot.user.presence.status)
            .addField("Nombres de membres / member's number", Discord.Intents.FLAGS.GUILD_MEMBERS)
            .addField("Nombres d'humains / Human's number", humans)
            .addField("Nombres de robots / Bot's number", bots)
            .addField("Nombres de personnes en ligne / Number of folks online", onlineCount)
            .addField('Propriétaire du serveur / Server owner', serverOwner)
            .setTimestamp()
            .setFooter(`Auteur/Author: @${user.username + '#' + user.discriminator}`, `${userIcon}`);
        return message.channel.send(embed)
    }
    // If the message content starts with "!kick"
    if (message.content.startsWith(`${prefix}kick`)) {
        // Assuming we mention someone in the message, this will return the user
        // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
        let user = message.mentions.users.first()
        // If we have a user mentioned
        if (user) {
            // Now we get the member from the user
            let member = message.guild.member(user)
            // If the member is in the guild
            if (member) {
                // Kick the member make sure you run this on a member, not a user! There are big differences between a user and a member
                member.kick("Des options serront dévoilées dans les logs du serveur / Optional reason that will display in the audit logs")
                    .then(() => {
                        // We let the message author know we were able to kick the person
                        return message.reply(`L'utilisateur ${user.tag} a été kick! / The user ${user.tag} has been kicked!`)
                    }).catch(err => {
                        // An error happened
                        // This is generally due to the bot not being able to kick the member,
                        // either due to missing permissions or role hierarchy
                        return message.reply("Il m'est impossible de kick cet utilisateur! / I was unable to kick the member!")
                    })
            } else {
                // The mentioned user isn't in this guild
                return message.reply("Cet utilisateur n'est pas présent sur ce serveur! / That user isn't in this guild!")
            }
            // Otherwise, if no user was mentioned
        } else {
            return message.reply("Vous n'avez pas mentionné l'utilisateur à kick! / You didn't mention the user to kick!");
        }
    }
    if (message.content.startsWith(`${prefix}clear`)) {
        const args = message.content.split(' ').splice(1).join(' ')
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            if(args < 1 || null || undefined){
                return message.reply("Vous n'avez pas supprimé au moins un message / You don't ")
            }else{
                message.channel.messages.fetch({limit: args}).then(messages => {
                    return message.channel.bulkDelete(messages)
                }).catch(err => {
                    return message.reply("Tu n'as pas la permission de clear :o / You don't have the permission to clear :o")
                })
            }
        }
    }
})