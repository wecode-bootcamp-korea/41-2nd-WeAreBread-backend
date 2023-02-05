const express = require("express");
const router = express.Router();
const breadController = require("../controllers/breadController");

router.get("", breadController.getBreadLists);

module.exports = {
  router,
};
