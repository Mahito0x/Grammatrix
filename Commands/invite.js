const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const buttons = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
    .setURL(
      "https://discord.com/oauth2/authorize?client_id=1373053820367671469&permissions=274877982720&scope=applications.commands%20bot"
    )
    .setLabel("Get Grammatrix on your server")
    .setStyle(ButtonStyle.Link),
  new ButtonBuilder()
    .setURL("https://discord.gg/KanK9j6pxV")
    .setLabel("Join the Grammatrix Support Server")
    .setStyle(ButtonStyle.Link)
);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Displays invite link for Grammatrix and the Global Lounge discord server'),
	everyone: true,
	async execute(interaction) {
		interaction.reply({ content: '**Here you go!**', ephemeral: true, components : [buttons] });
	},
	buttons: {
		'links' : async function links(interaction) {
			interaction.reply({ content: '**Here you go!**', ephemeral: true, components : [buttons] });
		},
	},
};
