const sortDao = require("../models/sortDao");

const sortLikes = async () => {
  const likes = await sortDao.sortLikes()
  return await likes
};

const sortReviews = async () => {
  const reviews = await sortDao.sortReviews()
  return await reviews
};

const sortGrade = async () => {
  const grade = await sortDao.sortGrade()
  return await grade
};

module.exports = { sortLikes, sortReviews, sortGrade };