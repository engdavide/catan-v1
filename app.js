const   mongoose = require('mongoose'),
        path = require('path'),
        express = require('express'),
        passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        passportLocalMongoose = require('passport-local-mongoose'),
        flash = require('connect-flash'),
        bodyParser = require('body-parser');
        
const   indexRoutes = require('./routes/index'),
        gameRoutes = require('./routes/game');
        
const   User = require('./models/users');    
        
const app = express();
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true}));

console.log(`Mongo: ${process.env.MONGO}`)
mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/public/images', express.static('images'))

// if this won't start, run in console: 
 // export MONGO=mongodb://localhost
 // to install: sudo service mongod restart
 
//AUTH CONFIG HERE...
app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


passport.use(new LocalStrategy(User.authenticate()));


//Pass user to all routes...
app.use(function(req,res, next){
        res.locals.currentUser = req.user;
        next();
});


app.use(indexRoutes);
app.use(gameRoutes);

console.log("PORT: ", process.env.PORT);
console.log("IP: ", process.env.IP);

app.listen(process.env.PORT, process.env.IP, () => {
    console.log(`server running at http://${process.env.IP}:${process.env.PORT}/`)
});