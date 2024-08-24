const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");

const serviceAccount = require("../next-bus-67f78-firebase-adminsdk-bseev-abcb2193e4.json");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseAuth = getAuth(firebaseApp);

module.exports = {
  firebaseApp,
  firebaseAuth,
};
