// userModel.js

const { firebaseAuth } = require("../config/firebase");
const User = require("../schemas/user");
const rolesEnum = require("../utils/roles");
const validateRoles = require("../utils/validatedRole");

const getMappedRoles = role => {
  if (role === rolesEnum.admin) {
    return [rolesEnum.admin, rolesEnum.areaManager, rolesEnum.owner, rolesEnum.manager];
  } else if (role === rolesEnum.areaManager) {
    return [rolesEnum.areaManager, rolesEnum.owner, rolesEnum.manager];
  } else if (role === rolesEnum.owner) {
    return [rolesEnum.owner, rolesEnum.manager];
  } else if (role === rolesEnum.manager) {
    return [rolesEnum.manager];
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
  // const firebaseUser = await firebaseAuth.getUser(uid);
  // return firebaseAuth.getUser(uid);
  // return { model, firebaseUser };
  return model;
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
  return firebaseAuth.listUsers();
};

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  updateUserRoleById,
  getFirebaseUserList,
};
