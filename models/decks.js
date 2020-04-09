const   mongoose = require('mongoose');

const   Cards = require('../models/cards');

let decksSchema = new mongoose.Schema({
    type: String,
    name: String, //could be devCards, player1, player2, etc.
    image: String,
    owner: String,
    game: String,
    cards: [{
        type: String,
        name: String,
        image: String
    }]
});


module.exports = mongoose.model("Decks", decksSchema);