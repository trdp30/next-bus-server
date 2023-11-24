const UserModel = require("../models/user");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const payload = req.body;
  const session = req.decodedToken;

  if (!Object.keys(payload).length) {
    return res.status(400).json({ error: "Empty payload" });
  }

  const model = await UserModel.createUser({ payload, session });

  return res.status(201).json(model);
});

const getUserById = asyncHandler(async (req, res) => {
  const uid = req.params.id;

  if (!uid) {
    return res.status(400).json({ error: "Missing Required params" });
  }

  const model = await UserModel.getUserById({ uid });
  return res.status(200).json(model);
});

const updateUserById = asyncHandler(async (req, res) => {
  const uid = req.params.id;
  const payload = req.body;

  if (!uid) {
    return res.status(400).json({ error: "Missing Required params" });
  }

  const model = await UserModel.updateUserById({ uid, payload });
  return res.status(200).json(model);
});

const updateUserRoleById = asyncHandler(async (req, res) => {
  const uid = req.params.id;
  const payload = req.body;

  if (!uid || !payload.roles) {
    return res.status(400).json({ error: "Missing Required params" });
  }

  const model = await UserModel.updateUserRoleById({ uid, payload });
  return res.status(200).json(model);
});

const getFirebaseUserList = asyncHandler(async (req, res) => {
  const model = await UserModel.getFirebaseUserList();
  return res.status(200).json(model);
});

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  updateUserRoleById,
  getFirebaseUserList,
};
