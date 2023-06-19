const router = require("express").Router();
const Quote = require("../models/quote_model");
const QuoteController = require("../controllers/quote.controller");

router.post('/send-img', [], QuoteController.register);

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/quotes', async (req, res) => {
    try {
        const quotes = await Quote.findAll();
        res.render('quotes-view', { quotes });
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar as citações');
      }
});

module.exports = router;