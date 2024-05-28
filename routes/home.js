const express = require("express")
const router = express.Router();
const {Todo, Note , User} = require("../models/schema.js");
const {isLogedIn }= require("../middleware.js");
const {home, newNote, addNote, deleteNote, error, noteDisplay} = require("../controllers/home.js")
//Home//Send form data to db
router.route("/")
.get(home)
.post(addNote)
//add notes
router.get("/new",isLogedIn, newNote);
//Delete
router.delete('/:id', deleteNote);
//note display
router.get("/note/:id",noteDisplay);
//Error 
router.get("*", error)
module.exports = router;