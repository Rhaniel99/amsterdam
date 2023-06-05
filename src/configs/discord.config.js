// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
// importação dos comandos
const fs = require("node:fs");
const path = require("node:path");
const commandPath = path.join(__dirname, "../commands");
const commandFiles = fs
  .readdirSync(commandPath)
  .filter((file) => file.endsWith(".js"));
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

for (const file of commandFiles) {
  const filePath = path.join(commandPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`Esse comando em ${filePath}`);
  }
}

// Login Bot
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
  //
  sendImageToChannel();
});

client.login(process.env.TOKEN);

// Listener de interações com o bot
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error("Comando não encontrado!");
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply("Houve um erro ao executar esse comando!");
  }
});

// Função para enviar a imagem para o canal
function sendImageToChannel() {
  // Lógica para processar a imagem e obter o caminho do arquivo
  const imagePath = path.join(__dirname, "../../public/img/teste.jpg");

  // ID do canal no Discord para onde você deseja enviar a imagem
  const channelId = '1115111545526030336';

  // Busca o canal no Discord
  const channel = client.channels.cache.get(channelId);

  if (!channel) {
    console.log('Canal não encontrado.');
    return;
  }

  // Envia a imagem para o canal
  channel.send({
    files: [{
      attachment: imagePath,
      name: 'rs.png'
    }]
  })
    .then(() => console.log('Imagem enviada com sucesso.'))
    .catch(error => {
      console.error('Erro ao enviar a imagem:', error);
    });
}
