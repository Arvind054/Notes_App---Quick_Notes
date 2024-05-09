const { Todo, Note, User } = require("../models/schema.js");

module.exports.getUser = (req, res) => {
    res.render("user/login.ejs");
}
module.exports.PostUser = async (req, res) => {
    req.flash("success", "login successful");
    let redirectUrl = res.locals.redirectUrl || "/home"
    res.redirect(redirectUrl);

}

module.exports.userSignup = (req, res) => {
    res.render("user/signup.ejs")
}

module.exports.postSignup = async (req, res, next) => {
    try {


        let { username, email, password } = req.body;
        const newUser = await new User({ username: username, email: email });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err)
            }
            let redirectUrl = res.locals.redirectUrl || "/home";
            req.flash("success", "Sign in successfully");
            res.redirect(redirectUrl);
        })

    }
    catch (err) {
        req.flash("error", err.message);
        res.redirect("/user/signup");
    }


}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "logout Successfully");
        res.redirect("/home");
    })
}