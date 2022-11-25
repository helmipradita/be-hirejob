const express = require(`express`);
const router = express.Router();
const { EmployeeController } = require(`../controllers/employee`);
const { protect } = require('../middleware/auth');

//Auth
router.post('/register', EmployeeController.register);
router.post('/login', EmployeeController.login);

//Profile
router.get(`/profile`, protect, EmployeeController.profile);
router.get(`/profile/:id`, EmployeeController.profileById);
router.post('/experience', protect, EmployeeController.insertExperience);
router.post('/skill', protect, EmployeeController.insertSkill);

module.exports = router;
