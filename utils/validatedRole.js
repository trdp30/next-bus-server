const { intersection, isEqual } = require("lodash");
const roles = require("./roles");

const validateRoles = (payloadRoles) => {
  const roleValues = Object.values(roles);
  const commonElements = intersection(payloadRoles, roleValues);
  return isEqual(payloadRoles, commonElements);
};

module.exports = validateRoles;
