const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const functions = require('../functions.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buttons')
		.setDescription('edit which buttons Grammatrix displays')
		.addBooleanOption(trans => trans.setName('translator').setDescription('Link to Google Translate'))
		.addBooleanOption(lang => lang.setName('language').setDescription('What language is being spoken'))
		.addBooleanOption(undo => undo.setName('undo').setDescription('Undo infraction'))
		.addBooleanOption(get => get.setName('get').setDescription('Link to Grammatrix')),

	async execute(interaction) {
		let transEmoji, langEmoji, undoEmoji, getEmoji;
		const GuildData = functions.liofaRead(interaction.guild.id);
		const buttons = await [interaction.options.getBoolean('translator'), interaction.options.getBoolean('language'), interaction.options.getBoolean('undo'), interaction.options.getBoolean('get')];
		for (let i = 0; i < buttons.length; i++) {
			if (typeof buttons[i] !== 'boolean') {
				buttons[i] = GuildData.Settings.buttons[i];
			}
		}
		GuildData.Settings.buttons = buttons;
		await functions.liofaUpdate(interaction, GuildData);
		GuildData.Settings.buttons[0]
      ? (transEmoji = "<:checkmark:1400190658819395624>")
      : (transEmoji = "<:crossmark:1400191032360042556>");
		GuildData.Settings.buttons[1]
      ? (langEmoji = "<:checkmark:1400190658819395624>")
      : (langEmoji = "<:crossmark:1400191032360042556>");
		GuildData.Settings.buttons[2]
      ? (undoEmoji = "<:checkmark:1400190658819395624>")
      : (undoEmoji = "<:crossmark:1400191032360042556>");
		GuildData.Settings.buttons[3]
      ? (getEmoji = "<:checkmark:1400190658819395624>")
      : (getEmoji = "<:crossmark:1400191032360042556>");
		const buttonEmbed = new EmbedBuilder()
			.setColor('#00ff08')
			.setDescription(transEmoji + ' Translator\n' + langEmoji + ' Language\n' + undoEmoji + ' Undo\n' + getEmoji + ' Get Grammatrix');
		interaction.reply({ embeds : [buttonEmbed] });
	},
};
