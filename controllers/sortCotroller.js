const sortService = require("../services/sortService");


const sortLikes = async (req, res) => {
  const likeList = await sortService.sortLikes();
  return res.status(200).json(likeList);
};

const sortReviews = async (req, res) => {
  const reviewList = await sortService.sortReviews();
  return res.status(200).json(reviewList);
};

const sortGrade = async (req, res) => {
  const gradeList = await sortService.sortGrade();
  return res.status(200).json(gradeList);
};

module.exports = { sortLikes, sortReviews, sortGrade };
