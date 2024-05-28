const {Todo, Note , User} = require("../models/schema.js");
const express = require("express");
const {isLogedIn }= require("../middleware.js");

module.exports.home = async (req, res) => {
    if(res.locals.currentUser){
    let Uid = res.locals.currentUser._id
    let Data = await User.findById(Uid).populate("notes");
    let noteData = Data.notes
    res.render("data/home.ejs", {noteData});
    }
    else{
        res.render("user/login.ejs");
    }
}
module.exports.newNote =(req, res) => {
    
    res.render("data/new.ejs");
}
module.exports.addNote = async (req, res) => {
    let { title, note } = req.body;
    const createdAt = new Intl.DateTimeFormat('en-IN', {
        year: 'numeric', month: 'long', day: '2-digit',
        hour: "numeric", minute: "numeric"
    }).format(new Date());
    const note1 = new Note({ title: title, note: note, date: createdAt });
    await note1.save();
    let noteId = note1._id;
    let id = res.locals.currentUser._id;
    const newdata = await User.findById(id);
    if (newdata) {
        newdata.notes.push(noteId);
        await newdata.save();
    } else {
        throw new Error("User not found");
    }
    res.redirect("/home");
}

module.exports.deleteNote = async (req, res) => {
    let { id } = req.params;
    let userId = res.locals.currentUser._id;
    await Note.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { notes: id } })

    res.redirect("/home");
}

module.exports.error = (req,res)=>{
    res.render("data/error.ejs")
}
    
module.exports.noteDisplay = async(req, res)=>{
    let{id}= req.params;
    let Data = await Note.findById(id);
    
    res.render("data/noteDisplay.ejs", {Data});
}

