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

module.exports = router;
