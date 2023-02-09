const { catchAsync } = require("../utils/error");
const shopService = require("../services/shopService");

const getDataForMainPage = catchAsync(async (req, res) => {
  const { breadId } = req.params;

  if (!breadId) throw new Error("KEY_ERROR");

  const shopDataByBread = await shopService.getDataForMainPage(breadId);

  res.status(200).json({ shopDataByBread });
});

const getSortedShopList = catchAsync(async (req, res) => {
  const { search, offset, limit, sort } = req.query;

  if ( !search || !offset || !limit ) throw new Error("KEY_ERROR");

  const list = await shopService.getSortedShopList(search, offset, limit, sort);

  return res.status(200).json({ list });
});

const getshopDetail = catchAsync(async (req, res) => {
  const { shopId } = req.params;

  if ( !shopId ) throw new Error("KEY_ERROR");

  const list = await shopService.getshopDetail(shopId);

  return res.status(200).json({ list });
});

const createShopLikeByUser = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { shopId } = req.params;

  if (!shopId || !userId) throw new Error("KEY_DOES_NOT_EXIST_ERROR");

  const result = await shopService.createShopLikeByUser(shopId, userId);

  return res.status(201).json(result);
});

const deleteShopLikeByUser = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const { shopId } = req.params;

  if (!shopId || !userId) throw new Error("KEY_DOES_NOT_EXIST_ERROR");

  await shopService.deleteShopLikeByUser(shopId, userId);

  return res.status(200).json({ message: "deleteShopLikeByUser SUCCESS" });
});

module.exports = {
  getDataForMainPage,
  getSortedShopList,
  getshopDetail,
  createShopLikeByUser,
  deleteShopLikeByUser,
};
