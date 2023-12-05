let express = require('express');
let router = express.Router();

let productController = require('../controller/productController');

router.post('/storeProduct',productController.newProduct);
router.get('/findProduct',productController.findProduct);
router.put('/updateProduct/:id',productController.updateProduct);
router.delete('/deleteProduct/:id',productController.deleteProduct);

module.exports = router;