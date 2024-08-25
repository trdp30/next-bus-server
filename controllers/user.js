const express = require("express");
const userService = require("../services/user");
const router = express.Router();
const { checkSuperAdminAccess, authAdminAccess } = require("../middlewares/authorization");

// Create a User
router.post("/", authAdminAccess, async (req, res) => {
  try {
    const payload = {
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
      password: req.body.password,
      organization_id: req.body.organization_id,
      profile_pic: req.body.profile_pic,
      role: req.body.role,
    };
    const session = req.decodedToken;
    const newUser = await userService.createUser({ payload, session });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get User by ID
router.get("/:userId", authAdminAccess, async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/firebase-user", checkSuperAdminAccess, async (req, res) => {
  try {
    console.log("called controller");
    const users = await userService.getFirebaseUserList();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Firebase User by ID
router.get("/firebase-user/:userId", authAdminAccess, async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update a User
router.put("/:userId", authAdminAccess, async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a User
router.delete("/:userId", checkSuperAdminAccess, async (req, res) => {
  try {
    await userService.deleteUser(req.params.userId);
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get All Users
router.get("/", authAdminAccess, async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/update-role/:id", checkSuperAdminAccess, async (req, res) => {
  try {
    const updatedUser = await userService.updateUserRoleById({ uid: req.params.id, payload: req.body });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
