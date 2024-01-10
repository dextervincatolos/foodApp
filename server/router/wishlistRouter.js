let express = require('express');
let router = express.Router();

let wishlistController = require('../controller/wishlistController');

router.post('/addWishlist',wishlistController.addWishlist);
router.get('/findMywishlist',wishlistController.findwishlist);

module.exports = router;