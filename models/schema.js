const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const noteSchema = new mongoose.Schema({
    title: String,
    note: String,
    date: String,
});

const Todoschema = new mongoose.Schema({
    Task: String,
    status: String,
});

const userSchema = new mongoose.Schema({
    // username: {
    //     type: String,
    //     required: true
    // },
    email :{
        type: String,
        required: true,
    },
    // password :{
    //     type: String
    // },
    todos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Todo"

        }
    ],
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});
userSchema.plugin(passportLocalMongoose)
module.exports.Todo = mongoose.model("Todo", Todoschema);
module.exports.Note = mongoose.model("Note", noteSchema);
module.exports.User = mongoose.model("User", userSchema);
