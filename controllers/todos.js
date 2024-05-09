
let {Todo, Note , User} = require("../models/schema.js");

module.exports.todos =  async (req, res) => {
    let id = res.locals.currentUser._id;
    const user = await User.findById(id).populate('todos');
    const user_todos = user.todos;
    res.render("data/todo.ejs", { user_todos });

}

module.exports.newtodo = async (req, res) => {
    try {
        let { task } = req.body;
        let id = res.locals.currentUser._id;
        const newTask = await new Todo({ Task: task });
        newTask.status = "";
        await newTask.save();

        const newdata = await User.findById(id);
        const task_id = newTask._id;

        if (newdata) {
            newdata.todos.push(task_id);
            await newdata.save();
        } else {
            throw new Error("User not found");
        }

        res.redirect("/todo");
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.checkbox = async (req, res) => {
    let { id } = req.params;
    let { Status } = req.body;
    const select_task = await Todo.findById(id);
    if (Status == "on") {
        select_task.status = "checked";
    }
    else if (!Status) {
        select_task.status = "";
    }


    await select_task.save();

    res.redirect("/todo");
}

module.exports.deleteTodo = async (req, res) => {
    let { id } = req.params;
    let userId = res.locals.currentUser._id;
    await Todo.findByIdAndDelete(id);
    let del_todo = await User.findByIdAndUpdate(userId, { $pull: { todos: id } })
    // console.log(del_todo);
    res.redirect("/todo");
};
module.exports.todoError = (req,res)=>{
    res.render("data/error.ejs");
}