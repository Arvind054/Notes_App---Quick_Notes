const passport = require("passport");
const {Todo, Note , User} = require("../models/schema.js");
const express = require("express")
const router = express.Router()
const flash = require("connect-flash");
const { saveredirectUrl } = require("../middleware.js");
const { getUser, PostUser, userSignup, postSignup, logout } = require("../controllers/user.js");

//user login//user Signup 
router.route("/login")
.get( getUser)
.post(saveredirectUrl,passport.authenticate('local', {failureRedirect :"/user/login", failureFlash:true}), PostUser);

//user signup

router.route("/signup")
.get(userSignup)
.post( postSignup)
//LogOut route
router.get("/logout",logout)
module.exports = router;