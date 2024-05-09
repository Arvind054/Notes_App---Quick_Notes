module.exports.isLogedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.OriginalUrl;
        req.flash("error", "Login/SignUp to Create Notes.");
      return res.redirect("/user/login")
    }
    next();
}

module.exports.saveredirectUrl  = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}
