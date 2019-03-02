const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Task = require("./task-model");

const projectSchema = new Schema({
  title: String,
  description: String,
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task"
    }
  ]
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
