const { appDataSource } = require("./dbconfig");

const getReviewData = async (userId, shopId) => {
  return appDataSource.query(
    `SELECT
      r.id as reviewId,
      u.nickname,
      r.score as reviewScore,
      r.content as reviewContent,
      (rr.user_id is NOT NULL) as recommendByThisUser,
      (
        SELECT count(*) 
        FROM review_recommends
        WHERE review_id = r.id
      ) as recommendCount,
      r.created_at
    FROM
      reviews as r
    LEFT JOIN review_recommends rr ON rr.review_id = r.id AND rr.user_id = ?
    JOIN users as u ON u.id = r.user_id
    WHERE
      r.shop_id = ?;
    `,
    [userId, shopId]
  );
};

const createReviewData = async (content, score, userId, shopId) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    await queryRunner.query(
      `INSERT INTO reviews (
        content,
        score,
        user_id,
        shop_id
      ) VALUES (?, ?, ?, ?)
      `,
      [content, score, userId, shopId]
    );

    await queryRunner.query(
      `UPDATE shops
      SET
        average_rating = (
                          SELECT AVG(score)
                          FROM reviews
                          WHERE shop_id = ?
                          )
      WHERE id = ?
      `,
      [shopId, shopId]
    )

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw new Error("FAILED_TO_CREATE_REVIEW");
  } finally {
    await queryRunner.release();
  }
};

const modifyReviewData = async (content, score, userId, reviewId) => {
  return appDataSource.query(
    `UPDATE reviews
    SET 
      content = ?,
      score = ?
    WHERE
      user_id = ?
    AND
      id = ?  
    `,
    [content, score, userId, reviewId]
  );
};

const deleteReviewData = async (userId, reviewId) => {
  return appDataSource.query(
    `DELETE FROM reviews
    WHERE
      user_id = ? 
    AND
      id = ?
    `,
    [userId, reviewId]
  );
};

const createReviewRecommendByUser = async (userId, reviewId) => {
  await appDataSource.query(
    `INSERT IGNORE INTO review_recommends (
      user_id,
      review_id
    ) VALUES (?, ?)
    `,
    [userId, reviewId]
  );
};

const deleteReviewRecommendByUser = async (userId, reviewId) => {
  await appDataSource.query(
    `DELETE FROM review_recommends
    WHERE
      user_id = ?
    AND
      review_id = ?
    `,
    [userId, reviewId]
  );
};

module.exports = {
  getReviewData,
  createReviewData,
  deleteReviewData,
  modifyReviewData,
  createReviewRecommendByUser,
  deleteReviewRecommendByUser,
};