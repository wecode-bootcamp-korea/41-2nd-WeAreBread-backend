const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const breadRouter = require("./breadRouter");
const shopRouter = require("./shopRouter");
const reviewRouter = require("./reviewRouter");

router.use("/users", userRouter.router);
router.use("/bread", breadRouter.router);
router.use("/shops", shopRouter.router);
router.use("/reviews", reviewRouter.router);

module.exports = router;
