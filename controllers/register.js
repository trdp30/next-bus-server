const express = require("express");
const router = express.Router();
const registerService = require("../services/register");

router.post("/", async (req, res) => {
  try {
    const payload = {
      email: req?.body?.email,
      phone: req?.body?.phone,
      name: req?.body?.name,
      password: req?.body?.password,
      organization_id: req?.body?.organization_id,
      profile_pic: req?.body?.profile_pic,
      role: req?.body?.role,
      address_1: req?.body?.address_1,
      address_2: req?.body?.address_2,
      location: req?.body?.location,
      pan: req?.body?.pan,
      driving_license: req?.body?.driving_license,
    };
    const session = req.decodedToken;
    const newUser = await registerService.registerUser({ payload, session });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error?.message });
  }
});

module.exports = router;
