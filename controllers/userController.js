const { catchAsync } = require("../utils/error");
const userService = require("../services/userService");

const kakaoLogin = catchAsync(async (req, res) => {
  const kakaoToken = req.headers.authorization;

  if (!kakaoToken) throw new Error("KEY_ERROR");

  const { accessToken, userNickname, status } = await userService.kakaoLogin(kakaoToken);

  res.status(status).json({ accessToken, userNickname });
});

module.exports = {
  kakaoLogin,
};
