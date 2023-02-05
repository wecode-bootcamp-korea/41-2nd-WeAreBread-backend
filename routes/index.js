const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const breadRouter = require("./breadRouter");
const shopRouter = require("./shopRouter");

router.use("/users", userRouter.router);
router.use("/bread", breadRouter.router);
router.use("/shops", shopRouter.router);

module.exports = router;
