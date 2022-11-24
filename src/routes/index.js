const express = require('express');
const router = express.Router();
const RolesRouter = require('../routes/roles');
const CompanyRouter = require('../routes/company');

router.use('/roles', RolesRouter);
router.use('/company', CompanyRouter);

module.exports = router;
