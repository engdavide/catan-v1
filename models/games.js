const   mongoose = require('mongoose');

const   Decks = require('../models/decks'),
        Users = require('../models/users');

let gamesSchema = new mongoose.Schema({
    type: String,
    name: String,
    image: String,
    owner: String,
    numPlayers: Number,
    players: [{
        id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Users"
            },
        username: String,
    }],
    decks: [{
        id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Decks"
            },
        type: String,
        name: String,
    }]
});


module.exports = mongoose.model("Games", gamesSchema);