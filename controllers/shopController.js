const { catchAsync } = require("../utils/error");
const shopService = require("../services/shopService");

const getDataForMainPage = catchAsync(async (req, res) => {
  const { breadId } = req.query;

  if (!breadId) throw new Error("KEY_ERROR");

  const shopDataByBread = await shopService.getDataForMainPage(breadId);

  res.status(200).json({ shopDataByBread });
});

module.exports = {
  getDataForMainPage,
};
