
const mongoose = require('mongoose');

const appBasketSchema = new mongoose.Schema({
    
    _items :[
        {type: mongoose.Schema.Types.ObjectId, ref:'product_collection'}
    ],
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'user_collection' }

});

const appBasket = mongoose.model('basket_collection', appBasketSchema);

module.exports = appBasket;


