const { catchAsync } = require("../utils/error");
const reviewService = require("../services/reviewService");

const getReviewData = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { shopId } = req.params;
  if (!shopId) throw new Error("KEY_DOES_NOT_EXIST_ERROR");

  const reviewData = await reviewService.getReviewData(userId, shopId);

  return res.status(200).json({ reviewData });
});

const createReviewData = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { content, score, shopId } = req.body;

  if (score < 1 || 5 < score) throw new Error("SCORE_IS_OUT_OF_RANGE_ERROR");

  if (!content || !score || !userId || !shopId) throw new Error("KEY_DOES_NOT_EXIST_ERROR");

  await reviewService.createReviewData(content, score, userId, shopId);

  return res.status(201).json({ message: "createReview SUCCESS" });
});

const modifyReviewData = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { content, score, reviewId } = req.body;

  if (score < 1 || 5 < score) throw new Error("SCORE_IS_OUT_OF_RANGE_ERROR");

  if (!content || !score || !reviewId) throw new Error("KEY_DOES_NOT_EXIST_ERROR");

  await reviewService.modifyReviewData(content, score, userId, reviewId);

  return res.status(201).json({ message: "modifyReview SUCCESS" });
});

const deleteReviewData = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { reviewId } = req.params;

  if (!userId || !reviewId) throw new Error("KEY_DOES_NOT_EXIST_ERROR");

  await reviewService.deleteReviewData(userId, reviewId);

  return res.status(200).json({ message: "deleteReview SUCCESS" });
});

const createReviewRecommendByUser = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { reviewId } = req.params;

  if (!userId || !reviewId) throw new Error("KEY_DOES_NOT_EXIST_ERROR");

  await reviewService.createReviewRecommendByUser(userId, reviewId);

  return res.status(201).json({ message: "createReviewRecommendByUser SUCCESS" });
});

const deleteReviewRecommendByUser = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { reviewId } = req.params;

  if (!userId || !reviewId) throw new Error("KEY_DOES_NOT_EXIST_ERROR");

  await reviewService.deleteReviewRecommendByUser(userId, reviewId);

  return res.status(200).json({ message: "deleteReviewRecommendByUser SUCCESS" });
});

module.exports = {
  getReviewData,
  createReviewData,
  modifyReviewData,
  deleteReviewData,
  createReviewRecommendByUser,
  deleteReviewRecommendByUser,
};
