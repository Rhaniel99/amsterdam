const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde com bong!"),
  async execute(interaction) {
    await interaction.reply("pong");
  },
};
