const express = require(`express`);
const router = express.Router();
const { CompanyController } = require(`../controllers/company`);
const { protect } = require('../middleware/auth');

//Auth
router.post('/register', CompanyController.register);
router.post('/login', CompanyController.login);
router.post('/verificationOtp', CompanyController.verificationOtp);
router.post('/forgotPassword', CompanyController.forgotPassword);
router.post('/resetPassword/:token', CompanyController.resetPassword);

//Profile
router.get('/', CompanyController.getEmp);
router.get('/:id', protect, CompanyController.getEmpById);
router.get('/profile', protect, CompanyController.profile);
router.put(`/:id`, protect, CompanyController.updateProfile);
router.post('/hire', protect, CompanyController.addHire);

module.exports = router;
