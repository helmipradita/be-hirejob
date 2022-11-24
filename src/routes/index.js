const express = require("express");
const router = express.Router();
const RolesRouter = require("../routes/roles");
const UsersRouter = require("../routes/users");

router.use("/roles", RolesRouter);
router.use("/users", UsersRouter);

module.exports = router;
