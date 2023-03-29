-- \i migrations/schema.sql
CREATE DATABASE loseit;
\c loseit

DROP TABLE IF EXISTS weights CASCADE;
DROP TABLE IF EXISTS foods CASCADE;
DROP TABLE IF EXISTS macros CASCADE;

CREATE TABLE weights (
  id SERIAL PRIMARY KEY,
  owner_id VARCHAR(255) NOT NULL,
  weight DOUBLE PRECISION, 
  date DATE
);

CREATE TABLE macros (
  id SERIAL PRIMARY KEY,
  owner_id VARCHAR(255) NOT NULL,
  carb DOUBLE PRECISION,
  protein DOUBLE PRECISION,
  fat DOUBLE PRECISION,
  calories DOUBLE PRECISION,
  UNIQUE(owner_id)
);

CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  owner_id VARCHAR(255) NOT NULL,
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