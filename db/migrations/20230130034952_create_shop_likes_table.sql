-- migrate:up
CREATE TABLE shop_likes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  shop_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT shop_likes_shop_id FOREIGN KEY (shop_id) REFERENCES shops(id),
  CONSTRAINT shop_likes_user_id FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT shop_likes_ukey UNIQUE (shop_id, user_id)
);

-- migrate:down
DROP TABLE shop_likes;
