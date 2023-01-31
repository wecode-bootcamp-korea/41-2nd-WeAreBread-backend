-- migrate:up
CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  score INT NOT NULL,
  user_id INT NOT NULL,
  shop_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT reviews_user_id FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT reviews_shop_id FOREIGN KEY (shop_id) REFERENCES shops(id)
);
-- migrate:down
DROP TABLE reviews;
