const express = require("express");
const router = express.Router();
const sortController = require("../controllers/sortCotroller");

router.get("/likes", sortController.sortLikes);
router.get("/reviews", sortController.sortReviews);
router.get("/grade", sortController.sortGrade);

module.exports = {
  router,
};
