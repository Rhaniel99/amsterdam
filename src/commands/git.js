const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// inside a command, event listener, etc.
const exampleEmbed = new EmbedBuilder()
	.setColor("Yellow")
	.setTitle('Comandos GIT')
	.setThumbnail('https://cdn.discordapp.com/attachments/1002635975266144287/1114411146271797370/logotipo-do-github.png')
	.addFields(
        { name: '\u200B', value: '\u200B' },
		{ name: '$ git init', value: 'Inicializa o git no diretorio', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
module.exports = {
  data: new SlashCommandBuilder()
    .setName("git")
    .setDescription("Relembra coisas do git, etcetera."),
  async execute(interaction) {
    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
