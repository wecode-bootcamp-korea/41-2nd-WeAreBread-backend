-- migrate:up
CREATE TABLE social_types (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(20),
  CONSTRAINT social_types_ukey UNIQUE (name)
);
-- migrate:down
DROP TABLE social_types;