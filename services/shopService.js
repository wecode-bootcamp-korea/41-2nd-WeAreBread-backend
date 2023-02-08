const shopDao = require("../models/shopDao");

const getDataForMainPage = async (breadId) => {
  return shopDao.getDataForMainPage(breadId);
};

const getSortedShopList = async (search, offset, limit, sort) => {
  return await shopDao.getSortedShopList(search, offset, limit, sort);
};

const getshopDetail = async (shopId) => {
  return await shopDao.getshopDetail(shopId);
};

const createShopLikeByUser = async (shopId, userId) => {
  return shopDao.createShopLikeByUser(shopId, userId);
};

const deleteShopLikeByUser = async (shopId, userId) => {
  return shopDao.deleteShopLikeByUser(shopId, userId);
};

module.exports = { 
  getDataForMainPage,
  getSortedShopList,
  getshopDetail,
  createShopLikeByUser,
  deleteShopLikeByUser,
};
