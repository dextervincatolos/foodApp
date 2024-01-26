

let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth');

let basketController = require('../controller/basketController');

router.post('/addtoBasket',auth.verifyUserToken,basketController.addtobasket);
router.get('/findMybasket',auth.verifyUserToken,basketController.findbasket);
router.get('/myCart', auth.verifyUserToken, basketController.getMyCart);

module.exports = router;

