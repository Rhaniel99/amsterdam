const multer = require("multer");
const path = require("node:path");

// Configuração do multer para o upload de imagens
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("artist_rep");

const register = async (req, res) => {
  try {
    const { artist_work, quote, date_release } = req.body;

    upload(req, res, function (err) {
      if (err) {
        console.error("Erro fazer o upload da imagem: ", err);
        return res.json({
          success: false,
          msg: "Erro ao registrar",
        });
      }

      const artist_rep = req.file;
      console.log(artist_work, quote, date_release, artist_rep);
      return res.json({
        success: true,
        msg: "Registrado com sucesso.",
      });
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: "Erro ao registrar",
    });
  }
};

function sendImageToChannel(client) {
  const imagePath = path.join(__dirname, "../../public/img/teste.jpg");
  const channelId = "1115111545526030336";
  const channel = client.channels.cache.get(channelId);

  if (!channel) {
    console.log("Canal não encontrado.");
    return;
  }

  channel
    .send({
      files: [
        {
          attachment: imagePath,
          name: "rs.png",
        },
      ],
    })
    .then((message) => {
      // Extrair a URL da imagem enviada
      const attachment = message.attachments.first();
      const imageUrl = attachment.url;

      console.log("Imagem enviada com sucesso.");
      console.log("URL da imagem:", imageUrl);

      // Aqui você pode usar a URL da imagem como desejar, por exemplo, exibir no console ou em uma página HTML

      // Exemplo de exibição em uma página HTML
      const html = `
          <html>
          <head>
            <title>Exibição da Imagem</title>
          </head>
          <body>
            <img src="${imageUrl}" alt="Imagem" width="500">
          </body>
          </html>
        `;
      // Você pode enviar o HTML para o cliente ou salvá-lo em um arquivo HTML para exibição posterior
    })
    .catch((error) => {
      console.error("Erro ao enviar a imagem:", error);
    });
}

module.exports = {
  register,
  sendImageToChannel,
};
