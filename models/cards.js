const   mongoose = require('mongoose');

const   Games = require('../models/games');

let cardsSchema = new mongoose.Schema({
    type: String,
    name: String,
    image: String
});


module.exports = mongoose.model("Cards", cardsSchema);