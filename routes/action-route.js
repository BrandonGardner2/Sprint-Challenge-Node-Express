const express = require("express");

const db = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const actions = await db.get();

    res.status(200).json(actions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong retrieving the actions." });
  }
});

router.post("/", async (req, res) => {
  if (req.body.description && req.body.notes && req.body.project_id) {
    try {
      const action = await db.insert(req.body);
      res.status(200).json(action);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong trying to add the action." });
    }
  } else {
    res
      .status(400)
      .json({ message: "Please provide a description, id and notes." });
  }
});

router.put("/:id", async (req, res) => {
  if (req.body.description && req.body.notes && req.body.project_id) {
    const { id } = req.params;
    try {
      const updated = await db.update(id, req.body);
      if (count) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "The action could not be located." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong updating the action." });
    }
  } else {
    res
      .status(400)
      .json({ message: "Please provide a description, id and notes." });
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
