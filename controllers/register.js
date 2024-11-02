const express = require("express");
const router = express.Router();
const registerService = require("../services/register");

router.post("/", async (req, res) => {
  try {
    const newUser = await registerService.registerUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
