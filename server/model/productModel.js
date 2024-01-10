

const mongoose = require('mongoose');

const appProductSchema = new mongoose.Schema({
    _product_name: String,
    _category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productCategory_collection'
    },
    _price: Number,
    _rating: Number,
    _description: String,
    _quantity: Number,
    _sold_item: Number,
    _product_image:{ data: Buffer,
    contentType:String }
});

const FoodProduct = mongoose.model('product_collection', appProductSchema);

module.exports = FoodProduct;

