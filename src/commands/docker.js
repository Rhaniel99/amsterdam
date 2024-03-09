const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("docker")
    .setDescription("Comando com query")
    .addStringOption(option =>
        option.setName("query")
            .setDescription("Digite sua query")
            .setRequired(true)), // Opção requerida

  async execute(interaction) {
    const query = interaction.options.getString("query");

    // Aqui você pode processar a query como quiser
    // Por exemplo, criar uma mensagem embed com base na query
    const embed = new EmbedBuilder()
      .setColor("RANDOM")
      .setTitle("Resultado da Query")
      .setDescription(`Você passou a seguinte query: ${query}`);

    await interaction.reply({ embeds: [embed] });
  },
};
