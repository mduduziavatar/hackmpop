CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


CREATE TABLE rentals (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  user_id INT REFERENCES users(id)
);

CREATE TABLE entertainment (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  user_id INT REFERENCES users(id)
);

CREATE TABLE ratings_reviews (
  id SERIAL PRIMARY KEY,
  rating INT NOT NULL,
  review TEXT,
  rental_id INT REFERENCES rentals(id),
  entertainment_id INT REFERENCES entertainment(id)
);
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  rental_id INT REFERENCES rentals(id),
  entertainment_id INT REFERENCES entertainment(id)
);

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  url VARCHAR(255) NOT NULL,
  rental_id INT REFERENCES rentals(id),
  entertainment_id INT REFERENCES entertainment(id)
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE rental_categories (
  rental_id INT REFERENCES rentals(id),
  category_id INT REFERENCES categories(id),
  PRIMARY KEY (rental_id, category_id)
);

CREATE TABLE entertainment_categories (
  entertainment_id INT REFERENCES entertainment(id),
  category_id INT REFERENCES categories(id),
  PRIMARY KEY (entertainment_id, category_id)
);
