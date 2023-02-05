const { catchAsync } = require("../utils/error");
const breadService = require("../services/breadService");

const getBreadLists = catchAsync(async (req, res) => {
  const breadLists = await breadService.getBreadLists();

  res.status(200).json({ breadLists });
});

module.exports = {
  getBreadLists,
};
