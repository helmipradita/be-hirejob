const express = require(`express`);
const router = express.Router();
const { RolesController } = require(`../controllers/roles`);

router.get(`/`, RolesController.select);
router.post(`/`, RolesController.insert);
router.put(`/:id`, RolesController.update);
router.delete(`/:id`, RolesController.delete);

module.exports = router;
