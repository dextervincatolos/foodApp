const mongoose = require('mongoose');

const appBasketSchema = new mongoose.Schema({
    _items :[
        {type: mongoose.Schema.Types.ObjectId, ref:'productModel'}
    ]

});

const appBasket = mongoose.model('basket_collection', appBasketSchema);

module.exports = appBasket;