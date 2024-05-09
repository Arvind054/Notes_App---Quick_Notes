const express = require("express")
const router = express.Router();
const {Todo, Note , User} = require("../models/schema.js");
const {isLogedIn }= require("../middleware.js");
const {home, newNote, addNote, deleteNote, error} = require("../controllers/home.js")
//Home//Send form data to db
router.route("/")
.get(home)
.post(addNote)
//add notes
router.get("/new",isLogedIn, newNote);
//Delete
router.delete('/:id', deleteNote);
//Error 
router.get("*", error)
module.exports = router;