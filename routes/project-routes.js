const express = require("express");
const mongoose = require("mongoose");
const Project = require("../models/project-model");

const router = express.Router();

router.get("/projects", (req, res, next) => {
  Project.find()
    .populate("tasks")
    .then(alltheProjects => {
      res.json(alltheProjects);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/projects", (req, res, next) => {
  console.log(req.body);
  Project.create({
    title: req.body.title,
    description: req.body.description,
    tasks: []
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/projects/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "El id no existe" });
    return;
  }

  Project.findById(req.params.id)
    .populate("tasks")
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/projects/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "El id no existe" });
    return;
  }
  Project.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.status(200).json({
        message: `Proyecto con id ${
          req.params.id
        } se ha actualizado correctamente`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

router.delete("/projects/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "El id no existe" });
    return;
  }
  Project.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({
        message: `Proyecto con id ${req.params.id} se ha borrado correctamente`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
