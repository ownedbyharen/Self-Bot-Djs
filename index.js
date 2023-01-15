/* * * * * * * * * * * * * * * * * *
*                                  *
             SelfBot                
         Author: haren       
         - Farhad#0752     
*                                  *                     
* * * * * * * * * * * * * * * * * */

const tokens = require('./config.json')
const Discord = require("discord.js-self");
const ms = require("ms");
const chalk = require("chalk")
const { ChannelID, ServerID } = require('./config.json')

for (let i = 0; i < tokens.clients.length; i++) {
    const client = new Discord.Client({
        ws: { properties: { $browser: "Discord iOS" } },
    });

    const random100 = Math.floor(Math.random() * 12 + 1);


    client.on("ready", () => {
        console.log(
            chalk.green(`[API] USER_${i} : ${client.user.tag}`) + " - " + chalk.blue(random100)
        );

        setInterval(() => {
            console.log(chalk.yellow(`[UPDATE] status updated for ${client.user.tag}`));
            const random = Math.floor(Math.random() * 50 + 1);
            try {
                if (random > 5) {
                    client.user.setPresence({
                        activity: { name: `Coded By:` },
                        status: "online",
                    });
                } else if (random < 5) {
                    client.user.setPresence({
                        activity: { name: `FarhadDragon` },
                        status: "dnd",
                    });
                } else if (random === 5) {
                    client.user.setPresence({
                        activity: { name: `💖` },
                        status: "invisible",
                    });
                } else return;
            } catch (err) {
                console.log(chalk.red(`[ERROR] USER_${i} : ${err.name}`));
                console.log(chalk.redBright(`[ERROR] USER_${i} : ${err.message}`));
            }
        }, random100 * ms("20min")); // Change Status

        const channel = client.channels.cache.get(ChannelID);
        if (!channel) return console.error(chalk.red("[CONNECTION] The channel does not exist!"));
        channel.join().then(connection => {
            console.log(chalk.yellow(`[CONNECTION] Connected ${client.user.tag}`));
            const Guild = client.guilds.cache.get(ServerID);
            const user = Guild.members.cache.get(client.user.id);
            setInterval(() => {
                if (user.voice.channel) {
                    return;
                } else {
                    channel
                        .join()
                        .then((connection) => {
                            console.log(chalk.yellow(`[CONNECTION] Reconnected ${client.user.tag}`));
                            connection.voice.setSelfDeaf(true);
                        })
                        .catch((e) => {
                            console.error(e);
                        });
                }
            }, 1000);
        }).catch(e => {
            console.error(chalk.red(e));
        });

    });
    client.login(tokens.clients[i]);
}
