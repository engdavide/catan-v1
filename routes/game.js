const   express = require('express'),
        router = express.Router(),
        passport = require('passport'),
        flash = require('connect-flash');
        
const   Users = require('../models/users');

const   rba = require('../functions/rba');        
        
router.get("/games", (req,res) =>{
    res.render('./games/index');
})



module.exports = router;