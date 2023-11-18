var express = require("express");
var router = express.Router();

const userController = require("../controllers/user");
const { checkSuperAdminAccess, authAdminAccess } = require("../middlewares/authorization");

router.post("/create", authAdminAccess, userController.createUser);
router.put("/role/:id", checkSuperAdminAccess, userController.updateUserRoleById);
router.put("/:id", authAdminAccess, userController.updateUserById);
router.get("/firebase-users", checkSuperAdminAccess, userController.getFirebaseUserList);
router.get("/:id", authAdminAccess, userController.getUserById);

module.exports = router;
