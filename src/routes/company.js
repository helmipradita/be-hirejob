const express = require(`express`);
const router = express.Router();
const { CompanyController } = require(`../controllers/company`);

router.get(`/`, CompanyController.select);
router.post(`/`, CompanyController.insert);
router.put(`/:id`, CompanyController.update);
router.delete(`/:id`, CompanyController.delete);

module.exports = router;
