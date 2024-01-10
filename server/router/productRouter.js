
let express = require('express');
let router = express.Router();

let productController = require('../controller/productController');



module.exports = function (upload){

    router.post('/storeProduct', upload.single('_product_image'),productController.newProduct);
    router.get('/findProduct',productController.findProduct);
    router.get('/findProductsByCategory', productController.findProductsByCategory);
    router.put('/updateProduct/:id',productController.updateProduct);
    router.delete('/deleteProduct/:id',productController.deleteProduct);

    return router;

};