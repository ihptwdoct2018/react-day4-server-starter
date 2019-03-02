const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/task-model");
const Project = require("../models/project-model");

const router = express.Router();

router.post("/tasks", (req, res, next) => {
  Task.create({
    title: req.body.title,
    description: req.body.description,
    project: req.body.projectID
  })
    .then(response => {
      console.log(response);
      Project.findByIdAndUpdate(req.body.projectID, {
        $push: { tasks: response._id }
      })
        .then(theResponse => {
          res.json(theResponse);
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
});

router.put("/tasks/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "El ID especificado no es válido" });
    return;
  }

  Task.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `La tarea con ID ${
          req.params.id
        } ha sido actualizada con éxito`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/tasks/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "El ID especificado no es válido" });
    return;
  }
  Task.findByIdAndDelete(req.params.id)
    .then(() =>
      res.json({
        message: `La tarea con el ID ${req.params.id} ha sido borrada con éxito`
      })
    )
    .catch(err => res.json(err));
});
module.exports = router;
