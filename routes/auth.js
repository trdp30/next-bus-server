const express = require("express");
const { firebaseAuth } = require("../config/firebase");

const router = express.Router();

// Sign in with email and password
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Generate a custom token
    const customToken = await firebaseAuth.createCustomToken(user.uid);

    res.status(200).json({ user, token: customToken });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Sign up with email and password
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Generate a custom token
    const customToken = await firebaseAuth.createCustomToken(user.uid);

    res.status(201).json({ user, token: customToken });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Sign out (Optional)
router.post("/signout", async (req, res) => {
  try {
    // You can handle sign-out logic here if needed
    res.status(200).json({ message: "Signed out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
