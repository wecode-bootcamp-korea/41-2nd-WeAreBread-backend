const reviewDao = require("../models/reviewDao");

const getReviewData = async (userId, shopId) => {
  return reviewDao.getReviewData(userId, shopId);
};

const createReviewData = async (content, score, userId, shopId) => {
  return reviewDao.createReviewData(content, score, userId, shopId);
};

const modifyReviewData = async (content, score, userId, reviewId) => {
  return reviewDao.modifyReviewData(content, score, userId, reviewId);
};

const deleteReviewData = async (userId, reviewId) => {
  return reviewDao.deleteReviewData(userId, reviewId);
};

const createReviewRecommendByUser = async (userId, reviewId) => {
  return reviewDao.createReviewRecommendByUser(userId, reviewId);
};

const deleteReviewRecommendByUser = async (userId, reviewId) => {
  return reviewDao.deleteReviewRecommendByUser(userId, reviewId);
};

module.exports = {
  getReviewData,
  createReviewData,
  modifyReviewData,
  deleteReviewData,
  createReviewRecommendByUser,
  deleteReviewRecommendByUser,
};
