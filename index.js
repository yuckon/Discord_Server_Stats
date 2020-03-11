const Discord = require('discord.js')
const bot = new Discord.Client()


// console.log(Discord)

bot.on('ready', function () {
    console.log("Je suis connecté ! \nI'm connected !")
})

bot.login('Njg2OTQ1NTE0MTg4NDM5NTcz.XmidRQ.l17WnW23ORv6-FsX8PeZM8sBxOc')

bot.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send(`Bienvenue sur mon serveur ${member.displayName} \nWelcome on my server ${member.displayName}`)
    }).catch(console.error)
    // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
})

// Create an event listener for messages
bot.on('message', message => {
    // If the message is "what is my avatar"
    if (message.content === '/avatar') {
        // Send the user's avatar URL
        message.reply(message.author.displayAvatarURL())
    }
})

// Create an event listener for messages
bot.on('message', message => {
    // If the message is "what is my avatar"
    if (message.content === '/members') {
        // Send the user's avatar URL
        message.reply(`Il y'a actuellement ${Discord.Intents.FLAGS.GUILD_MEMBERS} membres sur ton serveur \nThere is ${Discord.Intents.FLAGS.GUILD_MEMBERS} members on your server`)
    }
})

bot.on('message', message => {
    // If the message is "how to embed"
    if (message.content === '/info') {
        // We can create embeds using the MessageEmbed constructor
        // Read more about all that you can do with the constructor
        // over at https://discord.js.org/#/docs/main/master/class/MessageEmbed
        const user = message.author
        const userIcon = message.author.avatarURL()
        const embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Stats Serveur / Server Stats")
            .setDescription('Voici vos informations générales de votre serveur / There you are, this is the general informations of your server')
            // .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addField('Nombres de membres / Number of members', `${Discord.Intents.FLAGS.GUILD_MEMBERS}`)
            // .setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter(`Auteur: @${user.username+'#'+user.discriminator}/Author: @${user.username+'#'+user.discriminator}`, `${userIcon}`);
        message.channel.send(embed)
    }
})

bot.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return

    // If the message content starts with "!kick"
    if (message.content.startsWith('/kick')) {
        // Assuming we mention someone in the message, this will return the user
        // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
        const user = message.mentions.users.first()
        // If we have a user mentioned
        if (user) {
            // Now we get the member from the user
            const member = message.guild.member(user)
            // If the member is in the guild
            if (member) {
                /**
                 * Kick the member
                 * Make sure you run this on a member, not a user!
                 * There are big differences between a user and a member
                 */
                member
                    .kick("Des options serront dévoilées dans les logs du serveur \nOptional reason that will display in the audit logs")
                    .then(() => {
                        // We let the message author know we were able to kick the person
                        message.reply(`Kick effectué ${user.tag} \nSuccessfully kicked ${user.tag}`)
                    })
                    .catch(err => {
                        // An error happened
                        // This is generally due to the bot not being able to kick the member,
                        // either due to missing permissions or role hierarchy
                        message.reply("Il m'est impossible de kick cet utilisateur! \nI was unable to kick the member!")
                        // Log the error
                        console.error(err)
                    })
            } else {
                // The mentioned user isn't in this guild
                message.reply("Cet utilisateur n'est pas présent sur ce serveur! \nThat user isn't in this guild!")
            }
            // Otherwise, if no user was mentioned
        } else {
            message.reply("Vous n'avez pas mentionné l'utilisateur à kick! \nYou didn't mention the user to kick!");
        }
    }
})