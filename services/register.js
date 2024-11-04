const userService = require("./user");

const registerUser = async (payload, session) => {
  const newUser = await userService.createUser({ payload, session });
  return newUser;
};

module.exports = {
  registerUser,
};
