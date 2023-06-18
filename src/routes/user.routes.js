const router = require("express").Router();
const QuoteController = require("../controllers/quote.controller");

router.post('/send-img', [], QuoteController.register);

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/quotes', (req, res) => {
    res.render('quotes-view');
});

module.exports = router;