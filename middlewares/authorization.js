const { includes } = require("lodash");
const roles = require("../utils/roles");

const checkSuperAdminAccess = async (req, res, next) => {
  try {
    const decodedToken = req.decodedToken;
    if (
      decodedToken &&
      decodedToken.roles &&
      decodedToken.roles.length &&
      includes(decodedToken.roles, "SUPER_ADMIN")
    ) {
      next();
    } else {
      return res.status(401).send({ error: "Authorization denied" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

const authAdminAccess = async (req, res, next) => {
  try {
    const decodedToken = req.decodedToken;
    if (decodedToken && decodedToken.roles && decodedToken.roles.length && includes(decodedToken.roles, roles.admin)) {
      next();
    } else {
      return res.status(401).send({ error: "Authorization denied" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

const authOwnerAccess = async (req, res, next) => {
  try {
    const decodedToken = req.decodedToken;
    if (decodedToken && decodedToken.roles && decodedToken.roles.length && includes(decodedToken.roles, roles.owner)) {
      next();
    } else {
      return res.status(401).send({ error: "Authorization denied" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

const authManagerAccess = async (req, res, next) => {
  try {
    const decodedToken = req.decodedToken;
    if (
      decodedToken &&
      decodedToken.roles &&
      decodedToken.roles.length &&
      includes(decodedToken.roles, roles.manager)
    ) {
      next();
    } else {
      return res.status(401).send({ error: "Authorization denied" });
    }
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = {
  checkSuperAdminAccess,
  authAdminAccess,
  authOwnerAccess,
  authManagerAccess,
};
