module.exports = {

    isLoggedIn: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.session.returnTo = req.url;
        res.redirect('/login');
    },
    
    isAdmin: (req, res, next) =>{
        if(req.isAuthenticated()){
            if(req.user.role == "admin"){
                return next();
            } else {
                res.send("UNAUTHORIZED");
            }
        } else { 
            req.session.returnTo = req.url;
            res.redirect('/login');
      }
    },


        
};