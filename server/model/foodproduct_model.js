const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
    _product_name: { type: String, required: true},
    _category: { type: String, required: true},
    _rating: { type: Number, required: true},
    _description: { type: String, required: true},
    _quantity: { type: Number, required: true},
    _sold_item: { type: Number, required: true},
    _product_image: { data: Buffer, contentType: String}
});

const FoodProduct = mongoose.model('product_collection', appSchema);

module.exports = FoodProduct;