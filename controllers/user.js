const express = require("express");
const userService = require("../services/user");

const router = express.Router();

// Create a User
router.post("/", async (req, res) => {
  try {
    const newUser = await userService.createUser(
      req.body.email,
      req.body.organization_id,
      req.body.profile_pic,
      req.body.roles,
      req.body.uid,
      req.body.created_by,
      req.body.phone,
      req.body.name,
    );
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get User by ID
router.get("/:userId", async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update a User
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a User
router.delete("/:userId", async (req, res) => {
  try {
    await userService.deleteUser(req.params.userId);
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
