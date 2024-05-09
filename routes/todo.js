const express = require("express");
const router = express.Router()
let {Todo, Note , User} = require("../models/schema.js");
const { isLogedIn } = require("../middleware.js");
const { todos, newtodo, checkbox, deleteTodo, todoError } = require("../controllers/todos.js");

// Todo route
router.get("/",isLogedIn,todos);
//Add new Todo
router.post("/add", newtodo);
// for checkbox//For delete todo
router.route("/:id")
.post(checkbox)
.delete(deleteTodo);
//error in todo
router.get("*", todoError);

module.exports = router;
