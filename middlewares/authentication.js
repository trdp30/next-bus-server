const { firebaseAuth } = require("../config/firebase");

const authentication = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader) {
      return res.status(401).send({ error: "Authorization header not found" });
    }
    const idToken = authHeader && authHeader.split(" ")[1];
    if (idToken == null) return res.status(401);
    const decodedToken = await firebaseAuth.verifyIdToken(idToken);
    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = authentication;
