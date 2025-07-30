// Suppress MaxListenersExceededWarning
require("events").defaultMaxListeners = 20;
// Defines required stuff
const chalk = require("chalk");
const { ActivityType, PresenceUpdateStatus } = require("discord.js");
require("dotenv").config();
const fs = require("fs");

// Discord stuff
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  IntentsBitField,
} = require("discord.js");
const { link } = require("node:util");
const version = require("./package.json").version;

const myIntents = new IntentsBitField();

myIntents.add(
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildModeration,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildMessageReactions
);
const client = new Client({ intents: myIntents });

// Registers Commands
client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./Commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./Commands/${file}`);
  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// Defines callbacks
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(Events[event.name], (...args) => event.execute(...args));
  } else {
    client.on(Events[event.name], (...args) => event.execute(...args));
  }
}

client
  .login(process.env.BOTTOKEN)
  .then(() => {
    console.clear();
    console.log(
      chalk.blue(`
                                                                                                                   
MMMMMMMM               MMMMMMMM       444444444  HHHHHHHHH     HHHHHHHHH  1111111TTTTTTTTTTTTTTTTTTTTTTT     000000000     
M:::::::M             M:::::::M      4::::::::4  H:::::::H     H:::::::H 1::::::1T:::::::::::::::::::::T   00:::::::::00   
M::::::::M           M::::::::M     4:::::::::4  H:::::::H     H:::::::H1:::::::1T:::::::::::::::::::::T 00:::::::::::::00 
M:::::::::M         M:::::::::M    4::::44::::4  HH::::::H     H::::::HH111:::::1T:::::TT:::::::TT:::::T0:::::::000:::::::0
M::::::::::M       M::::::::::M   4::::4 4::::4    H:::::H     H:::::H     1::::1TTTTTT  T:::::T  TTTTTT0::::::0   0::::::0
M:::::::::::M     M:::::::::::M  4::::4  4::::4    H:::::H     H:::::H     1::::1        T:::::T        0:::::0     0:::::0
M:::::::M::::M   M::::M:::::::M 4::::4   4::::4    H::::::HHHHH::::::H     1::::1        T:::::T        0:::::0     0:::::0
M::::::M M::::M M::::M M::::::M4::::444444::::444  H:::::::::::::::::H     1::::l        T:::::T        0:::::0 000 0:::::0
M::::::M  M::::M::::M  M::::::M4::::::::::::::::4  H:::::::::::::::::H     1::::l        T:::::T        0:::::0 000 0:::::0
M::::::M   M:::::::M   M::::::M4444444444:::::444  H::::::HHHHH::::::H     1::::l        T:::::T        0:::::0     0:::::0
M::::::M    M:::::M    M::::::M          4::::4    H:::::H     H:::::H     1::::l        T:::::T        0:::::0     0:::::0
M::::::M     MMMMM     M::::::M          4::::4    H:::::H     H:::::H     1::::l        T:::::T        0::::::0   0::::::0
M::::::M               M::::::M          4::::4  HH::::::H     H::::::HH111::::::111   TT:::::::TT      0:::::::000:::::::0
M::::::M               M::::::M        44::::::44H:::::::H     H:::::::H1::::::::::1   T:::::::::T       00:::::::::::::00 
M::::::M               M::::::M        4::::::::4H:::::::H     H:::::::H1::::::::::1   T:::::::::T         00:::::::::00   
MMMMMMMM               MMMMMMMM        4444444444HHHHHHHHH     HHHHHHHHH111111111111   TTTTTTTTTTT           000000000     

                                                    Grammatrix                                                                
`)
    );
    console.log(chalk.green("Grammatrix is up and running!"));
    // Force DND status after login
    // Set DND status and rotating activities

    client.user.setPresence({ status: "dnd" });

    const activities = [
      {
        type: ActivityType.Playing,
        name: "with your non‑English words... try me",
      },
      {
        type: ActivityType.Watching,
        name: "for “hola” so I can ruin your day",
      },
      { type: ActivityType.Listening, name: "to every slip outside English" },
      {
        type: ActivityType.Competing,
        name: "to out‑grammar you all... and win",
      },
    ];

    let i = 0;
    const rotate = () => {
      const a = activities[i++ % activities.length];
      client.user.setPresence({
        activities: [{ name: a.name, type: a.type }],
        afk: false, // optional; remove if you don’t use AFK
      });
    };

    rotate();
    setInterval(rotate, 30_000);
  })
  .catch((err) => console.error("Failed to login:", err));
