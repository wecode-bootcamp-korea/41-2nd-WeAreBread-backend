-- migrate:up
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nickname VARCHAR(50) NULL,
  email VARCHAR(50) NULL,
  social_id VARCHAR(300),
  social_type_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT users_social_type_id FOREIGN KEY (social_type_id) REFERENCES social_types(id),
  CONSTRAINT users_ukey UNIQUE (email)
);
-- migrate:down
DROP TABLE users;