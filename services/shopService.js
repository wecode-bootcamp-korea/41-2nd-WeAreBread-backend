const shopDao = require("../models/shopDao");

const getDataForMainPage = async (breadId) => {
  return shopDao.getDataForMainPage(breadId);
};

module.exports = {
  getDataForMainPage,
};
