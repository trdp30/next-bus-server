const express = require("express");
const { firebaseAuth } = require("../config/firebase");
const { signInWithEmailAndPassword } = require("firebase/auth");
const { firebaseClientAuth } = require("../config/firebase-client");

const router = express.Router();

// export async function getAccessToken(
//   username: string,
//   password: string,
//   tenant_id: string,
// ): Promise<{ access_token: string; refresh_token: string; expires_in: number } | undefined> {
//   try {
//     const auth = getAuth(tenant_id);
//     const { user }: UserCredential = await signInWithEmailAndPassword(auth, username, password);
//     const { token: access_token, expirationTime } = await user.getIdTokenResult(true);
//     const expires_in = new Date(expirationTime).getTime() / 1000;
//     return {
//       access_token,
//       refresh_token: user.refreshToken,
//       expires_in,
//     };
//   } catch (error) {
//     handlerError(error);
//   }
// }

// Sign in with email and password
router.post("/token", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCredential = await signInWithEmailAndPassword(firebaseClientAuth, email, password);
    const user = userCredential.user;
    const { token, expirationTime: expires_in } = await user.getIdTokenResult(true);

    res.status(200).json({ token, expires_in, refresh_token: user.refreshToken });
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

module.exports = router;
