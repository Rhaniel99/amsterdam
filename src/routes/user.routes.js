const router = require("express").Router();
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

router.post('/send-img', async (req, res) => {
    // Lógica para processar a imagem e obter o caminho do arquivo
    const imagePath = '/public/img/teste.jpg';
  
    // ID do canal no Discord para onde você deseja enviar a imagem
    const channelId = '1115111545526030336';
    await client.channels.fetch();

    // Busca o canal no Discord
    const channel = client.channels.cache.get(channelId);
    console.log(channel);
    if (!channel) {
      return res.status(404).send('Canal não encontrado.');
    }
  
    // Envia a imagem para o canal
    channel.send({
      files: [{
        attachment: imagePath,
        name: 'rs.png'
      }]
    })
      .then(() => res.status(200).send('Imagem enviada com sucesso.'))
      .catch(error => {
        console.error('Erro ao enviar a imagem:', error);
        res.status(500).send('Ocorreu um erro ao enviar a imagem.');
      });
  });


module.exports = router;