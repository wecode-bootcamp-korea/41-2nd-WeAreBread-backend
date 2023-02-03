const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const sortRouter = require("./sortRouter");

router.use("/users", userRouter.router);
router.use("/sort", sortRouter.router);

module.exports = router;
