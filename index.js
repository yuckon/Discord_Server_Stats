const Discord = require('discord.js')
const bot = new Discord.Client()
const { Permissions } = require('discord.js')
const adminPermissions = new Permissions('ADMINISTRATOR')
const prefix = 'dss.'
const help = [
    "Pour avoir la liste des commandes / To return the list of commands",
    "Pour montrer l'avatar de l'utilisateur spécifié / To display the avatar of the specified user",
    "Pour montrer les infos sur l'utilisateur spécifié / To display informations about the specified user",
    "Pour voir les informations liées au serveur / To display the informations linked to server",
    "Pour kick un utilisateur spécifié / To kick a specified user",
    "Pour supprimer le nombre spécifié de messages / To delete the specified number of messages"
]

//Connection Phase
bot.login('Njg2OTQ1NTE0MTg4NDM5NTcz.Xmo6Bw.vB4b3GPUoaW3swWM6KKuMxkDhsA')
//If ready...
bot.on('ready', function () {

    console.log("Je suis connecté ! \nI'm connected !")
})

//When a user arrive on our server display a welcome message
bot.on('guildMemberAdd', async member => {
    //Find channel to send welcome message
    const channel = member.guild.channels.find('name', 'bienvenue')
    //If not the channel abort
    if (!channel) {
        return
    }
    channel.send(`Bienvenue sur le serveur ${member} / Welcome on our server ${member}`)
})

// Create an event listener for messages in order to display the url of their avatar
bot.on('message', message => {
    if (message.member.hasPermission(adminPermissions)) {
        if (message.content === `${prefix}help`) {
            let botImg = bot.user.avatarURL()
            let user = message.author
            let userIcon = message.author.avatarURL()
            let embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Liste des commandes / Commands List')
                .setDescription('Voici la liste des commandes \nThere you are, this is the commands list ')
                .setThumbnail(botImg)
                .addField('Version: ', 'v.1.0')
                .addField(`${prefix}help:`, help[0])
                .addField(`${prefix}avatar [utilisateur/user]:`, help[1])
                .addField(`${prefix}user [utilisateur/user]:`, help[2])
                .addField(`${prefix}info:`, help[3])
                .addField(`${prefix}kick [utilisateur/user]:`, help[4])
                .addField(`${prefix}clear [nombre/number]:`, help[5])
                .setTimestamp()
                .setFooter(`Auteur/Author: @${user.username + '#' + user.discriminator}`, `${userIcon}`);
            message.author.send(embed)
        }


        // If the message is "prefix+avatar"
        if (message.content.startsWith(`${prefix}avatar`)) {
            //We get the user mentionned
            let taggedUser = message.mentions.users.first()
            // If didn't mentione someone, return error
            if (!message.mentions.users.size) {
                return message.reply("Vous avez besoin de tager un utilisateur pour voir son avatar! / You need to tag a user in order to show his own avatar!")
            } else {
                // Send the user's avatar URL
                return message.reply(message.author.displayAvatarURL())
            }
        }

        // If the message start with "prefix+user"
        if (message.content.startsWith(`${prefix}user`)) {
            //We get the user mentionned
            let taggedUser = message.mentions.users.first()
            // If didn't mentione someone, return error
            if (!message.mentions.users.size) {
                return message.reply("Vous avez besoin de tager un utilisateur pour voir ses infos! / You need to tag a user in order to show his infos!")
            } else {
                let serverID = message.guild.id
                let userID = message.mentions.users.first().id
                let userLastMessage = message.mentions.users.first().lastMessage
                let userLastMessageID = message.mentions.users.first().lastMessageID
                let userLastMessageChannelID = message.mentions.users.first().lastMessageChannelID
                let userChannelLastMessageName = message.member.lastMessage.channel.name
                let botImg = bot.user.avatarURL()
                let user = message.author
                let userIcon = message.author.avatarURL()
                let rolesUser = message.member.roles.cache.map(role => role.name)
                let listServerWhereUserIn = bot.guilds.cache.filter((i => i.members.resolveID(userID))).map((j => j.name))
                let ServerWhereUserInOwnerName = bot.guilds.cache.filter((i => i.members.guild.id !== serverID)).map((j => j.owner.user.username))
                let ServerWhereUserInOwnerDiscriminator = bot.guilds.cache.filter((i => i.members.guild.id !== serverID)).map((j => j.owner.user.discriminator))
                let embed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Informations sur / Informations about: ${taggedUser.username}`)
                    .setDescription(`Voici les informations générales sur: ${taggedUser.username} \nThere you are, this is the general informations about: ${taggedUser.username}`)
                    .setThumbnail(botImg)
                    .addField('ID: ', userID)
                    .addField('ID du dernier message / Last message ID', userLastMessageID)
                    .addField("Dernier message / Last message", userLastMessage)
                    .addField("ID du channel du dernier message / Channel ID of last message", userLastMessageChannelID)
                    .addField("Nom du channel avec le dernier message / Channel's name with the last message", '#' + userChannelLastMessageName)
                    .addField("Roles de l'utilisateur / User roles ", rolesUser)
                    .addField("Nom des serveurs sur lesquels l'utilisateur est présent / Servers name on which user is present", listServerWhereUserIn)
                    .addField("Propriétaires des serveurs sur lesquels l'utilisateur est présent / Owners of thoses Servers name on which user is present", `@${ServerWhereUserInOwnerName}#${ServerWhereUserInOwnerDiscriminator}`)
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
            let serverList = bot.guilds.cache.map(member => member.name)
            let serverUserList = bot.guilds.cache.map(member => member.members.cache.map(name => name.user.username))
            let embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("Stats Serveur / Server Stats")
                .setDescription('Voici les informations générales de votre serveur\nThere you are, this is the general informations of your server')
                .setThumbnail(botImg)
                .addField('ID du serveur / Server ID', serverID)
                .addField('Status du robot / Bot Status', bot.user.presence.status)
                .addField('Liste des seveurs où le robot est actif / Servers list on which the bot is active', serverList)
                .addField('Liste des membres où le robot est actif / Members list on which the bot is active', serverUserList)
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
            //We get number of messages to delete after the command name
            let args = message.content.split(' ').splice(1).join(' ')
            //If you have permission to manage messages else throw error
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                //If number of message equals to 0 or nothing throw error
                if (args < 1 || null || undefined) {
                    return message.reply("Vous n'avez pas supprimé au moins un message / You don't delete at least 1 message ")
                } else {
                    //We delete the number of message you specify
                    message.channel.messages.fetch({ limit: args }).then(messages => {
                        return message.channel.bulkDelete(messages)
                    }).catch(err => {
                        return message.reply("Vous n'avez pas la permission de clear ou vous voulez clear trop de message ou je n'ai pas le droit de gérer les messages \n You don't have the permission to clear or you want to clear too much messages or I don't have the rights to manage messages")
                    })
                }
            }
        }
    } else {
        return message.reply("Vous n'avez pas la permission de m'utiliser au vue de votre role ou du channel ou vous m'appelez \nYou don't have the permission to use me because of your role or the channel where you called me")
    }
})