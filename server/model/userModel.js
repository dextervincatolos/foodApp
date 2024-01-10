

const mongoose = require('mongoose');

const appUserSchema = new mongoose.Schema({
    _first_name: String,
    _last_name: String,
    _email: String,
    _password: String,
    _accesstype: String
});

const user = mongoose.model('user_collection', appUserSchema);

module.exports = user;

