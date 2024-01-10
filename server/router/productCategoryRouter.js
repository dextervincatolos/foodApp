let express = require('express');
let router = express.Router();

let productCategoryController = require('../controller/productCategoryController');
let productCategorySeeder = require('../seeder/productCategory');


router.post('/createProductCategorySeeder',productCategorySeeder.seedFoodCategories);
router.get('/findProductCategory',productCategoryController.productCategory);

module.exports = router;

