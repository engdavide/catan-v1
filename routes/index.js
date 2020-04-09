const   express = require('express'),
        router = express.Router(),
        passport = require('passport'),
        flash = require('connect-flash');
        
const   Users = require('../models/users');
        
const   rba = require('../functions/rba');        
        
router.get("/", (req,res) =>{
    res.render('home');
})


//REGISTER
router.get('/register', function(req, res) {
    res.render('register', {message: req.flash('message')});
});

router.post('/register', (req,res,next) => {
    let newUser = ({username: req.body.newUsername, email: req.body.newEmail, notifSubmit: 'on', notifRfi: 'on', notifRelease: 'on'});
    Users.register(newUser, req.body.newPassword).then(user => {
      req.login(user, err => {
        if (err) next(err);
        else res.redirect("/");
      });
    })
    .catch(err => {
      if (err.name === "UserExistsError") {
        req.flash('message','Sorry, that username is already in use.');
        res.redirect("/register");
      } else if (err.name === "MissingPasswordError") {
        req.flash('message','Password cannot be blank');
        res.redirect("/register");
      } else next(err);
    });
});

//LOGIN
router.get("/login", function(req,res){
    res.render('login', {message: req.flash('error') });
});

router.post("/login", passport.authenticate("local",
    {
        successReturnToOrRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

//LOGOUT
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});


module.exports = router;