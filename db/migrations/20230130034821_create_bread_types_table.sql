-- migrate:up
CREATE TABLE bread_types (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  shop_id INT NOT NULL,
  bread_id INT NOT NULL,
  CONSTRAINT bread_types_shop_id FOREIGN KEY (shop_id) REFERENCES shops(id),
  CONSTRAINT bread_types_bread_id FOREIGN KEY (bread_id) REFERENCES breads(id)
);

-- migrate:down
DROP TABLE bread_types;
