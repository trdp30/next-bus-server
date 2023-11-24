const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");

const serviceAccount = require("../menu-on-road-firebase-adminsdk-8ugxb-0c2dc406ea.json");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseAuth = getAuth(firebaseApp);

module.exports = {
  firebaseApp,
  firebaseAuth,
};
