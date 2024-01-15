
let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth');

let productController = require('../controller/productController');



module.exports = function (upload){

    router.post('/storeProduct', upload.single('_product_image'),auth.verifyUserToken,productController.newProduct);
    router.get('/findProduct',auth.verifyUserToken,productController.findProduct);
    router.get('/findProductsByCategory',auth.verifyUserToken, productController.findProductsByCategory);
    router.put('/updateProduct/:id',auth.verifyUserToken,productController.updateProduct);
    router.delete('/deleteProduct/:id',auth.verifyUserToken,productController.deleteProduct);

    return router;

};