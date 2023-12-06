const mongoose = require('mongoose');

const appProductCategorySchema = new mongoose.Schema({
    _category: String,
    _desc: String
});

const productCategory = mongoose.model('productCategory_collection', appProductCategorySchema);

module.exports = productCategory;