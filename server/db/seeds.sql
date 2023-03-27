-- \i seeds/seeds.sql

-- Drop foreign key constraint on the `weights` table
ALTER TABLE weights DROP CONSTRAINT IF EXISTS weights_owner_id_fkey;

-- Drop foreign key constraint on the `foods` table
ALTER TABLE foods DROP CONSTRAINT IF EXISTS foods_owner_id_fkey;

-- Delete previous seed data from the `users`, `weights`, and `foods` tables
TRUNCATE TABLE users RESTART IDENTITY;
TRUNCATE TABLE weights RESTART IDENTITY;
TRUNCATE TABLE foods RESTART IDENTITY;



INSERT INTO users (email, username, user_id) 
VALUES ('john.doe@example.com','username1', 'ajdifjadi'),
      ('jane.doe@example.com','username2', 'jidia'),
      ('bob.smith@example.com','username3', 'aaadfe');

INSERT INTO foods (owner_id, food_id, brand, food, carb, protein, fat, calories, per_serving, serving_size_unit, serving_size, date) 
VALUES 
      (1,8281,'Kraft', 'Macaroni and Cheese', 48.0, 10.0, 13.0, 330.0, 70.0, 'g', 1, '2023-03-17'),
      (1,3883,'Kelloggs', 'Froot Loops', 33.0, 1.0, 1.0, 110.0, 30.0, 'g', 1, '2023-03-17'),
      (1, 2343,'McDonalds', 'Big Mac', 43.0, 25.0, 28.0, 540.0, 219.0, 'g', 1, '2023-03-17'),
      (1, 2543,'Dole', 'Mixed Fruit Cup', 21.0, 1.0, 0.0, 80.0, 113.0, 'g', 1, '2023-03-18'),
      (3, 8387,'Tyson', 'Grilled Chicken Breast', 0.0, 25.0, 3.0, 130.0, 85.0, 'g', 1, '2023-03-11');

INSERT INTO weights (owner_id, weight, date)
VALUES
      (1, 135.4, '2023-03-16'),
      (1, 141.2, '2023-03-15'),
      (1, 132.8, '2023-03-14'),
      (1, 137.6, '2023-03-13'),
      (1, 134.3, '2023-03-12'),
      (1, 129.9, '2023-03-11'),
      (1, 142.1, '2023-03-10'),
      (1, 131.7, '2023-03-09'),
      (1, 139.2, '2023-03-08'),
      (1, 138.5, '2023-03-07'),
      (1, 132.9, '2023-03-06'),
      (1, 143.8, '2023-03-05'),
      (1, 125.3, '2023-03-04'),
      (1, 129.1, '2023-03-03'),
      (1, 136.9, '2023-03-02'),
      (1, 141.5, '2023-03-01'),
      (1, 135.8, '2023-02-28'),
      (1, 127.6, '2023-02-27'),
      (1, 140.2, '2023-02-26'),
      (1, 136.7, '2023-02-25'),
      (1, 130.4, '2023-02-24'),
      (1, 137.9, '2023-02-23'),
      (1, 133.6, '2023-02-22'),
      (1, 139.1, '2023-02-21'),
      (1, 128.3, '2023-02-20'),
      (1, 133.4, '2023-02-19'),
      (1, 136.8, '2023-02-18'),
      (1, 128.9, '2023-02-17'),
      (1, 140.3, '2023-02-16'),
      (1, 138.2, '2023-02-15'),
      (1, 134.1, '2023-02-14'),
      (1, 142.7, '2023-02-13'),
      (1, 127.9, '2023-02-12'),
      (1, 136.2, '2023-02-11'),
      (1, 133.8, '2023-02-10'),
      (1, 139.4, '2023-02-09'),
      (1, 130.6, '2023-02-08'),
      (1, 142.9, '2023-02-07'),
      (1, 135.7, '2023-02-06'),
      (1, 128.5, '2023-02-05'),
      (1, 137.1, '2023-02-04'),
      (1, 134.9, '2023-02-03'),
      (1, 141.0, '2023-02-02'),
      (1, 132.2, '2023-02-01'),
      (1, 139.6, '2023-01-31'),
      (1, 136.0, '2023-01-30'),
      (1, 143.2, '2023-01-29'),
      (1, 131.1, '2023-01-28'),
      (1, 137.7, '2023-01-27'),
      (1, 129.8, '2023-01-26');




