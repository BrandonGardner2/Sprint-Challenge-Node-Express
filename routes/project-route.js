const express = require("express");

const db = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await db.get();

    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong retrieving the projects." });
  }
});

router.post("/", async (req, res) => {
  if (req.body.description && req.body.name) {
    try {
      const project = await db.insert(req.body);
      res.status(200).json(project);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong trying to add the project." });
    }
  } else {
    res.status(400).json({ message: "Please provide a description and name." });
  }
});

router.put("/:id", async (req, res) => {
  if (req.body.description && req.body.name) {
    const { id } = req.params;
    try {
      const updated = await db.update(id, req.body);
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "The project could not be located." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong updating the project." });
    }
  } else {
    res.status(400).json({ message: "Please provide a description and name." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db.remove(id);
    if (count) {
      res.status(200).json(count);
    } else {
      res.status(404).json({ message: "The action could not be located." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong trying to delete the action." });
  }
});

module.exports = router;
