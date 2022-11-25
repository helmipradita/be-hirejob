const express = require(`express`);
const router = express.Router();
const { EmployeeController } = require(`../controllers/employee`);
const { protect } = require('../middleware/auth_employee');

//Auth
router.post('/register', EmployeeController.register);
router.post('/login', EmployeeController.login);

//Profile
router.get(`/profile`, protect, EmployeeController.profile);
router.get(`/profile/:id`, EmployeeController.profileById);

module.exports = router;
