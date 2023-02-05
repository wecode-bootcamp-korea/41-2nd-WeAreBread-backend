const { appDataSource } = require("./dbconfig");

const getDataForMainPage = async (breadId) => {
  return appDataSource.query (
    `SELECT
      shops.id,
      shops.name,
      shops.address,
      shops.average_rating,
      bt.bread,
      rv.review,
      ri.review_image,
      (
        SELECT count(*) 
        FROM shop_likes
        WHERE shop_likes.shop_id = shops.id
      ) as likeCount
      FROM shops
    
    LEFT JOIN (
      SELECT
        shop_id,
        JSON_ARRAYAGG(
          breads.name
        ) as bread
      FROM
        bread_types
      JOIN breads ON bread_types.bread_id = breads.id
      GROUP BY shop_id
    ) bt ON shops.id = bt.shop_id
    
    LEFT JOIN (
      SELECT 
        shop_id,
        JSON_ARRAYAGG(
          reviews.content
        ) as review
      FROM reviews
      WHERE
        reviews.id
        IN (
          SELECT
            min(reviews.id) 
          FROM reviews
          GROUP BY shop_id
          )
      GROUP BY shop_id
    ) rv ON shops.id = rv.shop_id
  
    LEFT JOIN (
      SELECT
        reviews.shop_id,
        JSON_ARRAYAGG(
        review_images.img_url
      ) as review_image
      FROM review_images
      JOIN reviews ON review_images.review_id = reviews.id
      WHERE
        review_images.id
        iN (
          SELECT
            min(review_images.id)
          FROM review_images 
          JOIN reviews ON review_images.review_id = reviews.id
          GROUP BY reviews.shop_id
          )
      GROUP BY shop_id
    ) ri ON shops.id = ri.shop_id
    
    LEFT JOIN bread_types ON bread_types.shop_id = shops.id
    LEFT JOIN breads ON bread_types.bread_id = breads.id
    LEFT JOIN reviews ON shops.id = reviews.shop_id
    WHERE
      shops.id IN (
        SELECT
          shops.id
        FROM shops
        JOIN bread_types ON bread_types.shop_id = shops.id
        JOIN breads ON bread_types.bread_id = breads.id
        WHERE
          bread_types.bread_id = ?
        )
      GROUP BY shops.id;
    `,
    [breadId]
  );
};

module.exports = {
  getDataForMainPage,
};