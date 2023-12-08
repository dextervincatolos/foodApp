let express = require('express');
let router = express.Router();

let basketController = require('../controller/basketController');

router.post('/addtoBasket',basketController.addtobasket);

module.exports = router;