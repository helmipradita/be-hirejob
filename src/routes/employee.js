const express = require(`express`);
const router = express.Router();
const { EmployeeController } = require(`../controllers/employee`);
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/uploadPortofolio');

//Auth
router.post('/register', EmployeeController.register);
router.post('/login', EmployeeController.login);
router.post('/verificationOtp', EmployeeController.verificationOtp);
router.post('/forgotPassword', EmployeeController.forgotPassword);
router.post('/resetPassword/:token', EmployeeController.resetPassword);

//Profile
router.get(`/profile`, protect, EmployeeController.profile);
router.get(`/profile/:id`, EmployeeController.profileById);
router.post('/experience', protect, EmployeeController.insertExperience);
router.post('/skill', protect, EmployeeController.insertSkill);
router.post(
  '/portofolio',
  protect,
  upload.single('photo'),
  EmployeeController.insertPortofolio
);
router.put('/profile/update/:id', EmployeeController.updateProfile);

module.exports = router;
