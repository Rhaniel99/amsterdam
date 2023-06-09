const multer = require("multer");
const Quote = require("../models/quote_model");
const client = require("../configs/discord.config");
const path = require("node:path");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("artist_rep");

const register = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error("Erro ao fazer o upload da imagem: ", err);
      return res.json({
        success: false,
        msg: "Erro ao registrar",
      });
    }
    const { artist_work, quote, date_release } = req.body;
    const artist_rep = req.file;

    const quotes = new Quote({artist_work, quote, date_release});
    sendImageToChannel(client, artist_rep, quotes);
    await quotes.save();
    return res.json({
      success: true,
      msg: "Registrado com sucesso.",
    });
  });
};

function sendImageToChannel(client, artist_rep, quotes) {
  const channelId = process.env.CHANNEL_ID;
  const channel = client.channels.cache.get(channelId);

  if (!channel) {
    console.log("Canal não encontrado.");
    return;
  }
  channel
    .send({
      //   content: `Artista: ${artist_work}\nCitação: ${quote}\nData de Lançamento: ${date_release}`,
      files: [
        {
          attachment: artist_rep.buffer, // Use o buffer da imagem fornecido pelo Multer
          name: artist_rep.originalname,
        },
      ],
    })
    .then((message) => {
      // Extrair a URL da imagem enviada
      const attachment = message.attachments.first();
      const imageUrl = attachment.url;

      console.log("Imagem enviada com sucesso.");
      quotes.artist_rep = imageUrl;
      quotes.save();
    })
    .catch((error) => {
      console.error("Erro ao enviar a imagem:", error);
    });
}

// function sendImageToChannel(client) {
//   const imagePath = path.join(__dirname, "../../public/img/teste.jpg");
//   const channelId = "1115111545526030336";
//   const channel = client.channels.cache.get(channelId);

//   if (!channel) {
//     console.log("Canal não encontrado.");
//     return;
//   }

//   channel
//     .send({
//       files: [
//         {
//           attachment: imagePath,
//           name: "rs.png",
//         },
//       ],
//     })
//     .then((message) => {
//       // Extrair a URL da imagem enviada
//       const attachment = message.attachments.first();
//       const imageUrl = attachment.url;

//       console.log("Imagem enviada com sucesso.");
//       console.log("URL da imagem:", imageUrl);

//       // Aqui você pode usar a URL da imagem como desejar, por exemplo, exibir no console ou em uma página HTML

//       // Exemplo de exibição em uma página HTML
//       const html = `
//           <html>
//           <head>
//             <title>Exibição da Imagem</title>
//           </head>
//           <body>
//             <img src="${imageUrl}" alt="Imagem" width="500">
//           </body>
//           </html>
//         `;
//       // Você pode enviar o HTML para o cliente ou salvá-lo em um arquivo HTML para exibição posterior
//     })
//     .catch((error) => {
//       console.error("Erro ao enviar a imagem:", error);
//     });
// }

module.exports = {
  register,
  // sendImageToChannel,
};
