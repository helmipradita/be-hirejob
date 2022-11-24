const express = require('express');
const router = express.Router();
const RolesRouter = require('../routes/roles');

router.use('/roles', RolesRouter);

module.exports = router;
