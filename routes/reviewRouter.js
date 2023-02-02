const express = require("express");
const reviewController = require("../controllers/reviewController");
const { loginRequired, optionalRequired } = require("../utils/auth");

const router = express.Router();

router.get("/:shopId", optionalRequired ,reviewController.getReviewData);
router.post("", loginRequired, reviewController.createReviewData);
router.patch("", loginRequired, reviewController.modifyReviewData);
router.delete("/:reviewId", loginRequired, reviewController.deleteReviewData);
router.post("/recommend/:reviewId", loginRequired, reviewController.createReviewRecommendByUser);
router.delete("/recommend/:reviewId", loginRequired, reviewController.deleteReviewRecommendByUser);

module.exports = {
  router,
};
