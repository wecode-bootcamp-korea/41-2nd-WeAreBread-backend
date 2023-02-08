const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");
const { loginRequired, optionalRequired } = require("../utils/auth");

router.get("/bread_id/:breadId", shopController.getDataForMainPage);
router.get("/shop_id/:shopId", shopController.getshopDetail);
router.post("/like/:shopId", loginRequired, shopController.createShopLikeByUser);
router.delete("/like/:shopId", loginRequired, shopController.deleteShopLikeByUser);
router.get("", shopController.getSortedShopList);

module.exports = {
  router,
};
