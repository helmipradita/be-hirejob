const express = require(`express`);
const router = express.Router();
const { CompanyController } = require(`../controllers/company`);
const { protect } = require("../middleware/auth");

//Auth
router.post("/register", CompanyController.register);
router.post("/login", CompanyController.login);

//Profile
router.get("/profile", protect, CompanyController.profile);
router.post("/hire", protect, CompanyController.addHire);
router.post("/verificationOtp", CompanyController.verificationOtp);
router.post("/forgotPassword", CompanyController.forgotPassword);
router.post("/resetPassword/:token", CompanyController.resetPassword);
// router.get(`/`, protect, CompanyController.getHire);

module.exports = router;
