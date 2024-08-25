const { firebaseAuth } = require("../config/firebase");
const User = require("../models/user");
const rolesEnum = require("../utils/roles");
const validateRoles = require("../utils/validatedRole");

const getMappedRoles = role => {
  if (role === rolesEnum.admin) {
    return [rolesEnum.admin, rolesEnum.owner, rolesEnum.driver, rolesEnum.assistantDriver, rolesEnum.handyman];
  } else if (role === rolesEnum.owner) {
    return [rolesEnum.owner, rolesEnum.driver, rolesEnum.assistantDriver, rolesEnum.handyman];
  } else if (role === rolesEnum.driver) {
    return [rolesEnum.driver, rolesEnum.assistantDriver, rolesEnum.handyman];
  } else if (role === rolesEnum.assistantDriver) {
    return [rolesEnum.assistantDriver, rolesEnum.handyman];
  } else if (role === rolesEnum.handyman) {
    return [rolesEnum.handyman];
  } else {
    return [];
  }
};

const createUser = async ({ payload, session }) => {
  const { email, phone, name, password, organization_id, profile_pic, role } = payload;

  const response = await firebaseAuth.createUser({
    email: email,
    emailVerified: false,
    // phoneNumber: (phone || "").toString(),
    password: password,
    displayName: name,
    // photoURL: profile_pic || null,
    disabled: false,
  });

  const roles = getMappedRoles(role);

  await firebaseAuth.setCustomUserClaims(response.uid, {
    roles: roles,
    organization_id,
  });

  const newUser = new User({
    email,
    organization_id,
    profile_pic,
    uid: response.uid,
    roles: roles,
    created_by: session.uid,
    phone: (phone || "").toString(),
    name,
  });

  const model = await newUser.save();

  return model;
};

const getUserById = async ({ uid }) => {
  const model = await User.findOne({ uid });
  return model;
};

const getFirebaseUserById = async ({ uid }) => {
  return firebaseAuth.getUser(uid);
};

const updateUserById = async ({ uid, payload }) => {
  const model = await User.findOneAndUpdate({ uid }, payload);
  return model.save();
};

const updateUserRoleById = async ({ uid, payload }) => {
  const roles = getMappedRoles(payload?.role);
  const isValidPayload = validateRoles(roles);
  if (!isValidPayload) {
    throw Error("Invalid roles");
  }
  if (payload.organization_id) {
    await firebaseAuth.setCustomUserClaims(uid, { organization_id: payload.organization_id });
  }

  await firebaseAuth.setCustomUserClaims(uid, { roles: roles });
  const model = await User.findOneAndUpdate({ uid }, { roles: roles });
  return model.save();
};

const getFirebaseUserList = async () => {
  return await firebaseAuth.listUsers();
};

// Get All Users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(`Error retrieving users: ${error.message}`);
  }
};

// Delete a User
const deleteUser = async userId => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

// Update a User
const updateUser = async (userId, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  updateUserRoleById,
  getFirebaseUserList,
  getAllUsers,
  deleteUser,
  updateUser,
  getFirebaseUserById,
};
