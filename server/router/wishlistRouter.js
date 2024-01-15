let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth');

let wishlistController = require('../controller/wishlistController');

router.post('/addWishlist',auth.verifyUserToken,wishlistController.addWishlist);
router.get('/findMywishlist',auth.verifyUserToken,wishlistController.findwishlist);

module.exports = router;