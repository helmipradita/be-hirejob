const express = require("express");
const router = express.Router();
const RolesRouter = require("../routes/roles");
const UsersRouter = require("../routes/users");
const CompanyRouter = require('../routes/company');
const EmployeeRouter = require('../routes/employee');


router.use("/roles", RolesRouter);
router.use("/users", UsersRouter);
router.use('/company', CompanyRouter);
router.use('/employee', EmployeeRouter);

module.exports = router;
