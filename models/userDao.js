const { appDataSource } = require("./dbconfig");

const SOCIAL_TYPES = Object.freeze({
  kakao: 1,
  naver: 2,
  google: 3,
});

const createUser = async (nickname, email, socialId) => {
  const createUser = await appDataSource.query(
    `INSERT INTO users(
      nickname,
      email,
      social_id,
      social_type_id
    ) VALUES (?, ?, ?, ?);
    `,
    [nickname, email, socialId, SOCIAL_TYPES.kakao]
  );

  return createUser.insertId;
};

const getSocialUser = async (socialId) => {
  const [getSocialUser] = await appDataSource.query(
    `SELECT
      id,
      nickname,
      email,
      social_id,
      social_type_id
    FROM users
    WHERE social_id = ?;
    `,
    [socialId]
  );
  return getSocialUser;
};

const getUserById = async (userId) => {
  const [result] = await appDataSource.query(
    `SELECT
          id userId
        FROM
          users
        WHERE
          id = ?;`,
    [userId]
  );
  return result;
};

module.exports = {
  createUser,
  getSocialUser,
  getUserById,
};
