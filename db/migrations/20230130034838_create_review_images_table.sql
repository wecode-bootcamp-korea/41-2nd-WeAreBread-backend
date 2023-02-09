-- migrate:up
CREATE TABLE review_images (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  img_url VARCHAR(1000) NOT NULL,
  review_id INT NOT NULL,
  CONSTRAINT review_images_review_id FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE review_images;
