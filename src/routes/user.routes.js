const router = require("express").Router();
const QuoteController = require("../controllers/quote.controller");

router.post('/send-img', [], QuoteController.register);

module.exports = router;