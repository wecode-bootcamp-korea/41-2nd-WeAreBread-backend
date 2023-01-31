-- migrate:up
CREATE TABLE review_recommends (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  review_id INT NOT NULL,
  user_id INT NOT NULL,
  CONSTRAINT review_recommends_review_id FOREIGN KEY (review_id) REFERENCES reviews(id),
  CONSTRAINT review_recommends_user_id FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT review_recommends_ukey UNIQUE (review_id, user_id)
);

-- migrate:down
DROP TABLE review_recommends;
