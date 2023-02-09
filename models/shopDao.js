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


const getSortedShopList = async (search, offset, limit, sort) => {
  const sortMethod = Object.freeze({
    likes: "likeCount DESC",
    reviews: "reviewCount DESC",
    rates: "shopAverageRating DESC",
  });

  return appDataSource.query(
    `SELECT
      shops.id as shopId,
      shops.name as shopName,
      shops.address as shopAddress,
      shops.average_rating as shopAverageRating,
      bt.bread,
      rv.reviewContent,
      ri.review_image,
      ri.reviewByNickname,
      (
      SELECT count(*) 
      FROM shop_likes
      WHERE shop_likes.shop_id = shops.id
      ) as likeCount,
      (
      SELECT count(*) 
      FROM reviews
      WHERE reviews.shop_id = shops.id
      ) as reviewCount,
      shops.latitude,
      shops.longitude
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
        ) as reviewContent
      FROM reviews
      WHERE
        id in (select min(id) from reviews group by shop_id)
      GROUP BY shop_id
    ) rv ON shops.id = rv.shop_id

    LEFT JOIN (
      SELECT
        reviews.shop_id,
        JSON_ARRAYAGG(
          review_images.img_url
        ) as review_image,
        JSON_ARRAYAGG(
      users.nickname
        ) as reviewByNickname
        FROM review_images
      JOIN reviews ON review_images.review_id = reviews.id
      JOIN users ON reviews.user_id = users.id
      WHERE
        review_images.id in (select min(review_images.id) from review_images join reviews ON review_images.review_id = reviews.id group by reviews.shop_id)
      GROUP BY shop_id
    ) ri ON shops.id = ri.shop_id

    LEFT JOIN reviews ON shops.id = reviews.shop_id
    LEFT JOIN users ON users.id = reviews.user_id
    WHERE
      shops.id IN (
        SELECT 
          shops.id
        FROM shops
        LEFT JOIN bread_types ON bread_types.shop_id = shops.id
        LEFT JOIN breads ON breads.id = bread_types.bread_id
        WHERE (shops.name LIKE '%${search}%') OR (shops.address LIKE "%${search}%") OR (breads.name LIKE "%${search}%")
      )
    GROUP BY shops.id
    ORDER BY ${sortMethod[sort]}, shops.id ASC
    LIMIT ${limit} OFFSET ${offset}`
  );
};

const getshopDetail = async (shopId) => {
  return appDataSource.query (
    `SELECT
      s.id,
      s.name,
      s.address,
      btj.bread,
      s.shop_number,
      s.business_hours,
      s.average_rating,
      (
        SELECT count(*) 
        FROM shop_likes
        WHERE shop_likes.shop_id = s.id
      ) as likeCount,
      ri.review_image
    FROM shops AS s
    JOIN bread_types AS bt ON bt.shop_id = s.id
    JOIN breads AS b ON bt.bread_id = b.id
    LEFT JOIN shop_likes AS sl ON sl.shop_id = s.id
    
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
    ) btj ON s.id = btj.shop_id

    LEFT JOIN (
    SELECT
      reviews.shop_id,
      JSON_ARRAYAGG(
        review_images.img_url
      ) as review_image
      FROM review_images
    JOIN reviews ON review_images.review_id = reviews.id
    WHERE
      review_images.id in (select min(review_images.id) from review_images join reviews ON review_images.review_id = reviews.id group by reviews.shop_id)
      GROUP BY shop_id
    ) ri ON s.id = ri.shop_id
    WHERE s.id = ?
    GROUP BY s.id
    `
    ,
    [shopId]
  );
};

const createShopLikeByUser = async (shopId, userId) => {
  await appDataSource.query(
    `INSERT IGNORE INTO shop_likes (
      shop_id,
      user_id
    ) VALUES (?, ?)
    `,
    [shopId, userId]
  );

  return appDataSource.query(
    `SELECT
      shop_id,
      user_id
    FROM shop_likes
    WHERE
      shop_id = ?
    AND
      user_id = ?
    `,
    [shopId, userId]
  );
};

const deleteShopLikeByUser = async (shopId, userId) => {
  await appDataSource.query(
    `DELETE FROM shop_likes
    WHERE
      shop_id = ?
    AND
      user_id = ?
    `,
    [shopId, userId]
  );
};

module.exports = { 
  getDataForMainPage,
  getSortedShopList,
  getshopDetail,
  createShopLikeByUser,
  deleteShopLikeByUser
};
