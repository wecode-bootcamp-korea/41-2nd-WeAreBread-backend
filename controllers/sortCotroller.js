const sortService = require("../services/sortService");


const sortLikes = async (req, res) => {
  const likes = await sortService.sortLikes();
  return res.status(200).json({ data: likes });
};

const sortReviews = async (req, res) => {
  const reviewList = await sortService.sortReviews();
  return res.status(200).json({ data: reviewList });
};

const sortGrade = async (req, res) => {
  const gradeList = await sortService.sortGrade();
  return res.status(200).json({ data: gradeList });
};

module.exports = { sortLikes, sortReviews, sortGrade };
