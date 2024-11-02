const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const firebaseClientApp = initializeApp(firebaseConfig, "next-bus-admin");

const firebaseClientAuth = getAuth(firebaseClientApp);

module.exports = {
  firebaseClientApp,
  firebaseClientAuth,
};
