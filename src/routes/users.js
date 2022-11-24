const express = require("express");
const router = express.Router();
const { UsersController } = require("../controllers/users");
const { validate } = require("../helpers/users");
const { role } = require("../middleware/auth");

router.post("/register/:role", role, UsersController.registerUsers);
router.post("/login/:role", role, UsersController.login);
router.post("/verificationOtp", UsersController.verificationOtp);

module.exports = router;
