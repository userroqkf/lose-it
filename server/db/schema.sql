-- \i migrations/schema.sql
CREATE DATABASE loseit;
\c loseit

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS weights CASCADE;
DROP TABLE IF EXISTS foods CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
CREATE TABLE weights (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  weight DOUBLE PRECISION, 
  date DATE
);

CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  food_id INTEGER NOT NULL,
  brand VARCHAR(255),
  food VARCHAR(255) NOT NULL,
  carb DOUBLE PRECISION,
  protein DOUBLE PRECISION,
  fat DOUBLE PRECISION,
  calories DOUBLE PRECISION,
  per_serving DOUBLE PRECISION,
  serving_size_unit VARCHAR(255),
  serving_size DOUBLE PRECISION,
  date DATE
);




-- psql -h localhost -p 5432 -U vagrant bootcampx