const { appDataSource } = require("./dbconfig");

const sortLikes = async () => {
  const likes = await appDataSource.query(
    `
    SELECT
      s.latitude AS shopsLatitude,
      s.longitude AS shopsLongitude,
      ri.img_url AS reviewImage,
      s.name AS shopsName,
      s.address AS shopsAddress,
      s.average_rating AS shopsAverageRating,
      (SELECT MAX(user_id) AS countReviews FROM reviews),
	    (SELECT MAX(shop_id) AS countLikes FROM shop_likes),
      r.content AS reviewsContents,
      r.user_id AS reviewers
    FROM 
      reviews r
    LEFT JOIN 
      review_images ri ON ri.review_id = r.id
    LEFT JOIN
      shops s ON s.id = r.shop_id
    ORDER BY 
	    (SELECT MAX(shop_id) AS countLikes FROM shop_likes);
    `
  );
  return likes;
};

const sortReviews = async () => {
  const reviews = await appDataSource.query(
    `
    SELECT
      s.latitude AS shopsLatitude,
      s.longitude AS shopsLongitude,
      ri.img_url AS reviewImage,
      s.name AS shopsName,
      s.address AS shopsAddress,
      s.average_rating AS shopsAverageRating,
      (SELECT MAX(user_id) AS countReviews FROM reviews),
      (SELECT MAX(shop_id) AS countLikes FROM shop_likes),
      r.content AS reviewsContents,
      r.user_id AS reviewers
    FROM 
      reviews r
    LEFT JOIN 
      review_images ri ON ri.review_id = r.id
    LEFT JOIN
      shops s ON s.id = r.shop_id
    ORDER BY 
      (SELECT MAX(user_id) AS countReviews FROM reviews)
    `
  );
  return reviews;
};

const sortGrade = async () => {
  const grade = await appDataSource.query(
    `
    SELECT
      s.latitude AS shopsLatitude,
      s.longitude AS shopsLongitude,
      ri.img_url AS reviewImage,
      s.name AS shopsName,
      s.address AS shopsAddress,
      s.average_rating AS shopsAverageRating,
      (SELECT MAX(user_id) AS countReviews FROM reviews),
      (SELECT MAX(shop_id) AS countLikes FROM shop_likes),
      r.content AS reviewsContents,
      r.user_id AS reviewers
    FROM 
      reviews r
    LEFT JOIN 
      review_images ri ON ri.review_id = r.id
    LEFT JOIN
      shops s ON s.id = r.shop_id
    ORDER BY 
    s.average_rating
    `
  );
  return grade;
};

module.exports = {
  sortLikes,
  sortReviews,
  sortGrade
};
