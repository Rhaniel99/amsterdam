const multer = require("multer");
const Quote = require("../models/quote_model");
const client = require("../configs/discord.config");
const path = require("node:path");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("artist_rep");
const sharp = require('sharp')

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
    const quotes = new Quote({ artist_work, quote, date_release });

    try {
      await sendImageToChannel(client, artist_rep, quotes);
      return res.json({
        success: true,
        msg: "Registrado com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao enviar a imagem para o Discord:", error);
      return res.json({
        success: false,
        msg: "Erro ao registrar",
      });
    }
  });
};

const update = async (req, res) =>{

}


function sendImageToChannel(client, artist_rep, quotes) {
  return new Promise((resolve, reject) => {
    const channelId = process.env.CHANNEL_ID;
    const channel = client.channels.cache.get(channelId);

    if (!channel) {
      console.log("Canal não encontrado.");
      reject(new Error("Canal não encontrado."));
      return;
    }

    const fileBuffer = artist_rep.buffer; // Obter o buffer do arquivo

    // Verifique as dimensões da imagem
    sharp(fileBuffer)
      .metadata()
      .then((metadata) => {
        const width = metadata.width;
        const height = metadata.height;

        if (width === 564 && height === 564) {
          // A imagem já possui as dimensões desejadas, não é necessário redimensionar
          console.log("A imagem já possui as dimensões desejadas.");
          return fileBuffer;
        } else {
          // Redimensione a imagem para 564x564
          console.log("Redimensionando a imagem...");
          return sharp(fileBuffer)
            .resize(564, 564)
            .toBuffer();
        }
      })
      .then((imageBuffer) => {
        // Envie a imagem para o canal Discord
        channel
          .send({
            files: [
              {
                attachment: imageBuffer,
                name: artist_rep.originalname,
              },
            ],
          })
          .then((message) => {
            const attachment = message.attachments.first();
            const imageUrl = attachment.url;

            console.log("Imagem enviada com sucesso.");
            quotes.artist_rep = imageUrl;
            return quotes.save();
          })
          .then(() => {
            console.log("Registrado com sucesso.");
            resolve();
          })
          .catch((error) => {
            console.error("Erro ao enviar a imagem:", error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error("Erro ao verificar as dimensões da imagem:", error);
        reject(error);
      });
  });
}

module.exports = {
  register,
  update
};
