const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js');
const functions = require('../functions.js');
const bold = functions.boldText;

async function displayInfractions(interaction, target) {
  const GuildData = functions.liofaRead(interaction.guild.id);
  const timeSinceLastInfraction = functions.minutesSince(Date.now(), GuildData.Watchlist[target.id].time);
  const warningCount = GuildData.Watchlist[target.id].warnings;

  const infractionsEmbed = new EmbedBuilder()
    .setColor('#a60000') // Hex color for clarity
    .setTitle(bold(target.username))
    .setThumbnail(`https://cdn.discordapp.com/avatars/${target.id}/${target.avatar}.png`)
    .addFields(
      { name: 'Minutes since last infraction', value: bold(String(timeSinceLastInfraction)), inline: true },
      { name: 'Warnings given', value: bold(String(warningCount)), inline: true },
    )
    .setFooter({ text: `Settings listed are for guild ID: ${interaction.guild.id}` });

  return infractionsEmbed;
}

async function modButtons(resetDisabled, target) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`mod reset ${target.id}`)
      .setLabel('Reset infractions')
      .setStyle(ButtonStyle.Success)
      .setDisabled(resetDisabled),
    new ButtonBuilder()
      .setCustomId(`mod increase ${target.id}`)
      .setLabel('+1 Infraction')
      .setStyle(ButtonStyle.Danger)
  );
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mod')
    .setDescription('View or remove infractions')
    .addUserOption(user =>
      user
        .setName('user')
        .setDescription('User to find information on')
        .setRequired(true)
    ),

  usage: '[user]',

  async execute(message) {
    const GuildData = functions.liofaRead(message.guild.id);
    let target;

    if (functions.liofaPrefixCheck(message)) {
      const args = message.content.split(' ');
      target = await message.guild.members.fetch(functions.userToID(args[1], message));
      target = target.user;
      if (!target) return;
    } else {
      target = message.options.getUser('user');
    }

    return info(message);

    async function info(interaction) {
      let buttons = await modButtons(true, target);

      if (GuildData.Watchlist[target.id] != null && GuildData.Watchlist[target.id].warnings !== 0) {
        buttons = await modButtons(false, target);
      }

      if (GuildData.Watchlist[target.id] != null) {
        return interaction.reply({
          embeds: [await displayInfractions(interaction, target)],
          components: [buttons],
        });
      } else {
        return interaction.reply({
          content: `<@${target.id}> has 0 infractions`,
          components: [buttons],
        });
      }
    }
  },

  buttons: {
    reset: async function reset(interaction, name) {
      const GuildData = functions.liofaRead(interaction.guild.id);
      let target = await interaction.guild.members.fetch(functions.userToID(name[2], interaction));
      target = target.user;
      if (!target) return;

      GuildData.Watchlist[target.id].warnings = 0;
      await interaction.message.delete();
      await interaction.reply({
        content: `<@${target.id}>'s infractions have been reset`,
        ephemeral: true,
      });
      functions.liofaUpdate(interaction, GuildData);
    },

    undo: async function undo(interaction, name) {
      const GuildData = functions.liofaRead(interaction.guild.id);
      let target = await interaction.guild.members.fetch(functions.userToID(name[2], interaction));
      target = target.user;
      if (!target) return;

      if (GuildData.Watchlist[target.id].warnings <= 0) {
        return interaction.reply({
          content: '🛑 User already has less than 1 infraction',
          ephemeral: true,
        });
      }

      GuildData.Watchlist[target.id].warnings--;
      functions.liofaUpdate(interaction, GuildData);

      await interaction.message.delete();
      return interaction.reply({
        content: `<@${target.id}> has one less infraction`,
        ephemeral: true,
      });
    },

    increase: async function increase(interaction, name) {
      let target = await interaction.guild.members.fetch(functions.userToID(name[2], interaction));
      target = target.user;
      if (!target) return;

      functions.liofaMod(interaction, target.id);

      await interaction.message.delete();
      return interaction.reply({
        embeds: [await displayInfractions(interaction, target)],
        components: [await modButtons(false, target)],
      });
    },
  },
};
