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
  if (req.body.description && req.body.notes) {
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
      .json({ message: "Please provide both a description and notes." });
  }
});

module.exports = router;
