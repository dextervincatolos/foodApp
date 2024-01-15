let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth');

let productCategoryController = require('../controller/productCategoryController');
let productCategorySeeder = require('../seeder/productCategory');


router.post('/createProductCategorySeeder',auth.verifyUserToken,productCategorySeeder.seedFoodCategories);
router.get('/findProductCategory',auth.verifyUserToken,productCategoryController.productCategory);

module.exports = router;

