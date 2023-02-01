const jwt = require("jsonwebtoken");
const axios = require("axios");

const userDao = require("../models/userDao");

const kakaoLogin = async (kakaoToken) => {
  const { data } = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      authorization: `Bearer ${kakaoToken}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  const nickname = data.properties.nickname;
  const email = data.kakao_account.email;
  const socialId = data.id;

  const user = await userDao.getSocialUser(socialId);

  if (!user) {
    const userId = await userDao.createUser(nickname, email, socialId);
    const jsonwebtoken = await jwt.sign({ id: userId }, process.env.JWT_SECRET);

    return { accessToken: jsonwebtoken, status: 201 };
  }

  const userId = user.id;
  const jsonwebtoken = await jwt.sign({ id: userId }, process.env.JWT_SECRET);

  return { accessToken: jsonwebtoken, status: 200 };
};

module.exports = {
  kakaoLogin,
};
