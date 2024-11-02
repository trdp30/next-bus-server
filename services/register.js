const User = require("./user");

const registerUser = async payload => {
  try {
    const user = await User.getUserByEmail(payload.email);
    if (user) {
      throw new Error("User already exists. Please login with your credentials.");
    }
    return await User.createUser({ payload });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
};
