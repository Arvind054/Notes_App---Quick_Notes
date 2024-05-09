const express = require("express");
const app = express();
app.set("view engine", "ejs");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
const { Todo, Note, User } = require("./models/schema.js");
const home = require("./routes/home.js");
const todo = require("./routes/todo.js");
const user = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const url = "mongodb+srv://arvindchoudhary054:Gp2UszZq2XMkKBcQ@cluster0.e5eirjy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
main()
.then(console.log("connected to db"))
.catch(err => console.log(err));
async function main() {
    await mongoose.connect(url);
   // console.log("mongoose connected successfully");
}
const sessionOptions = {secret : "secretcode",
 resave: false,
  saveUninitialized:true,
cookie: {
    expires : Date.now() + (7*24*60*60*1000),
    maxAge : (7*24*60*60*1000),
    httpOnly :true
}}
//for passport
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
   
    next();
})
app.use("/home", home);
app.use("/todo", todo);
app.use("/user", user)

app.listen(8080, (req, res) => {
    console.log("listening to port")
});