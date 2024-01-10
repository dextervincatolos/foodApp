const mongoose = require('mongoose');

const appWishlistSchema = new mongoose.Schema({
    
    _items :[
        {type: mongoose.Schema.Types.ObjectId, ref:'product_collection'}
    ],
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'user_collection' }

});


const appWishlist = mongoose.model('wishlist_collection', appWishlistSchema);

module.exports = appWishlist;
