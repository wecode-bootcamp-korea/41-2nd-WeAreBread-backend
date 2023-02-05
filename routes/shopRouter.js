const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

router.get("", shopController.getDataForMainPage);

module.exports = {
  router,
};
