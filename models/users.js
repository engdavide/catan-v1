const   mongoose = require('mongoose'),
        passportLocalMongoose = require("passport-local-mongoose");
        

//const   Clients = require('../models/clients');


let usersSchema = new mongoose.Schema({
    username: String,
    password: String,
});


usersSchema.plugin(passportLocalMongoose, {usernameLowerCase: true});

module.exports = mongoose.model("Users", usersSchema);