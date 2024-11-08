const { omitBy, isNil } = require("lodash");
const { firebaseAuth } = require("../config/firebase");
const User = require("../models/user");
const rolesEnum = require("../utils/roles");
const validateRoles = require("../utils/validatedRole");

const getMappedRoles = role => {
  const parsedRole = (role || "").toLowerCase();
  switch (parsedRole) {
    case rolesEnum.admin.toLowerCase():
      return [rolesEnum.admin, rolesEnum.owner, rolesEnum.driver, rolesEnum.assistantDriver, rolesEnum.handyman];
    case rolesEnum.owner.toLowerCase():
      return [rolesEnum.owner, rolesEnum.driver, rolesEnum.assistantDriver, rolesEnum.handyman];
    case rolesEnum.driver.toLowerCase():
      return [rolesEnum.driver, rolesEnum.assistantDriver, rolesEnum.handyman];
    case rolesEnum.assistantDriver.toLowerCase():
      return [rolesEnum.assistantDriver, rolesEnum.handyman];
    case rolesEnum.handyman.toLowerCase():
      return [rolesEnum.handyman];
    default:
      return [rolesEnum.consumer];
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
  // const roles = Object.keys(rolesEnum)
  //   .map(k => rolesEnum[k])
  //   .concat("SUPER_ADMIN");

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
    created_by: session?.uid || "self",
    phone: (phone || "").toString(),
    name,
  });

  const model = await newUser.save();

  return model;
};

const getUserByEmail = async email => {
  const model = await User.findOne({ email: email });
  return model;
};

const getUserById = async userId => {
  const model = await User.findById(userId);
  return model;
};

const getUserByFBId = async fbUserId => {
  const model = await User.findOne({ uid: fbUserId });
  return model;
};

const getFirebaseUserById = async uid => {
  return firebaseAuth.getUser(uid);
};

const updateUserById = async ({ uid, payload }) => {
  const model = await User.findOneAndUpdate({ uid }, payload);
  return model.save();
};

const updateUserRoleById = async ({ userId, payload }) => {
  const roles = getMappedRoles(payload?.role);
  const isValidPayload = validateRoles(roles);
  if (!isValidPayload) {
    throw Error("Invalid roles");
  }
  const user = await getUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  if (payload.organization_id) {
    await firebaseAuth.setCustomUserClaims(user.uid, { organization_id: payload.organization_id });
  }

  await firebaseAuth.setCustomUserClaims(user.uid, { roles: roles });
  const model = await User.findOneAndUpdate({ uid: user.uid }, { roles: roles });
  await model.save();
  return await User.findOne({ uid: user.uid });
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
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await firebaseAuth.deleteUser(user.uid);
    const res = await User.findByIdAndDelete(userId);
    return res;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

// Update a User
const updateUser = async (userId, updateData) => {
  try {
    const payload = omitBy(
      {
        organization_id: updateData.organization_id,
        profile_pic: updateData.profile_pic,
        phone: updateData.phone,
        name: updateData.name,
      },
      isNil,
    );
    const user = await getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const fbPayload = omitBy(
      {
        displayName: payload.name,
      },
      isNil,
    );

    if (Object.keys(fbPayload).length) {
      await firebaseAuth.updateUser(user.uid, fbPayload);
    }

    return await User.findByIdAndUpdate(userId, payload, {
      new: true,
      runValidators: true,
    });
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
  getUserByEmail,
  getUserByFBId,
};
