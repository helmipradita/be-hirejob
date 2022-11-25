const express = require(`express`);
const router = express.Router();
const { CompanyController } = require(`../controllers/company`);
const { protect } = require('../middleware/auth');

router.post('/register', CompanyController.register);
router.post('/login', CompanyController.login);
router.get('/profile', protect, CompanyController.profile);

router.get(`/`, CompanyController.select);
router.post(`/`, CompanyController.insert);
router.put(`/:id`, CompanyController.update);
router.delete(`/:id`, CompanyController.delete);

module.exports = router;
