-- migrate:up
CREATE TABLE shops (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(100) NOT NULL,
  shop_number VARCHAR(50) NULL,
  business_hours VARCHAR(1000) NOT NULL,
  latitude DECIMAL(10,7) NOT NULL,
  longitude DECIMAL(10,7) NOT NULL,
  average_rating DECIMAL(2,1) NULL
);

-- migrate:down
DROP TABLE shops;
