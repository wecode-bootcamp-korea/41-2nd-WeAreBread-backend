const breadDao = require("../models/breadDao");

const getBreadLists = async () => {
  return breadDao.getBreadLists();
};

module.exports = {
  getBreadLists,
};
