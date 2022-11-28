const express = require(`express`);
const router = express.Router();
const { EmployeeController } = require(`../controllers/employee`);
const { protect } = require('../middleware/auth');
const {uploadPortofolio} = require ('../middleware/uploadPortofolio')

//Auth
router.post('/register', EmployeeController.register);
router.post('/login', EmployeeController.login);

//Profile
router.get(`/profile`, protect, EmployeeController.profile);
router.get(`/profile/:id`, EmployeeController.profileById);
router.post('/experience', protect, EmployeeController.insertExperience);
router.post('/skill', protect, EmployeeController.insertSkill);
router.post('/portofolio', uploadPortofolio.single('portofolio'),EmployeeController.insertPortofolio);
router.put('/profile/update/:id', EmployeeController.updateProfile);


module.exports = router;
