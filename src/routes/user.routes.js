const router = require("express").Router();
const QuoteController = require("../controllers/quote.controller");
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

router.post('/send-img', [], QuoteController.register);


module.exports = router;