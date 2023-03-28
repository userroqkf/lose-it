const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
require('dotenv').config();
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const { auth } = require('express-oauth2-jwt-bearer');

const audience = process.env.AUDIENCE;
const issuerBaseURL = process.env.ISSUERBASEURL;
const tokenSigningAlg = process.env.TOKENSIGNINGALG;

console.log("audience issuebaseurl, tokensigningalg",audience, issuerBaseURL, tokenSigningAlg);

// const jwtCheck = auth({
//   audience: audience,
//   issuerBaseURL: issuerBaseURL,
//   tokenSigningAlg: tokenSigningAlg
// });

// const jwtCheck = auth({
//   audience: 'https://lose-it.api.com',
//   issuerBaseURL: 'https://dev-3wg0p5oh0fp28tqe.us.auth0.com/',
//   tokenSigningAlg: 'RS256'
// });
// console.log(jwtCheck, "jwtCheck");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// app.use(jwtCheck);

const pool = new Pool({
  host: 'localhost',
  user: 'kimjon0509',
  password: '5431',
  database: 'loseit'
});

const API_KEY = process.env.NODE_ENV;
// const API_KEY = "s99Gif3tGh1LNr63BgQULwOxS2zveA4k81MHoTm8";

//Need to refactor this into another file later
const getFood = async(userId) => {
  // Define the SQL query to fetch the food data
  const query = `
    SELECT 
    date,
    ARRAY_AGG
    (
      json_build_object(
        'id', id, 
        'foodId', food_id,
        'brand', brand, 
        'food', food,
        'fat', fat,
        'carb', carb,
        'protein', protein,
        'calories', calories,
        'perServing', per_serving,
        'servingUnit',serving_size_unit,
        'servingSize', serving_size
      )
    ) AS food_data
    FROM foods
    WHERE owner_id = $1
    GROUP BY date;
  `;
  const { rows } = await pool.query(query, [userId]);
  const result = cleanFoodData(rows);
  return result;
};

const cleanFoodData = (data) => {
  const cleanedData = {};
  data.forEach((val, index) => {
    const cleanedDate = val.date. toLocaleDateString();
    cleanedData[cleanedDate] = val.food_data;
  });
  return cleanedData;
};

const getWeight =  async(userId) => {
  const query = `
    SELECT DATE(date) as x, weight as y
    FROM weights
    WHERE owner_id = $1;
  `;

  const { rows } = await pool.query(query, [userId]);
  return rows;
};

const addWeight = async(userId, weight, date) => {
  const query = `
    INSERT INTO weights (owner_id, weight, date)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { result } = await pool.query(query, [userId, weight, date]);
  return result;
};

const deleteWeight = async(userId, date) => {
  const query = `
    DELETE FROM weights
    WHERE owner_id = $1 AND date = $2;
  `;
  console.log(query);
  const { result } = await pool.query(query, [userId, date]);
  return result;
};

const addFood = async(userId, foodData, date) => {
  const query = `
    INSERT INTO foods (owner_id, food_id, brand, food, carb, protein, fat, calories, per_serving, serving_size_unit, serving_size, date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *;
  `;
  const {result} = await pool.query(query, [
    userId,
    foodData.foodId,
    foodData.brand,
    foodData.food,
    foodData.carb,
    foodData.protein,
    foodData.fat,
    foodData.calories,
    foodData.perServing,
    foodData.servingUnit,
    foodData.servingSize,
    date
  ]);
  return result;
};

const deleteFood = async(userId, foodId, inputDate) => {
  const query = `
    DELETE FROM foods
    WHERE owner_id = $1 AND food_id = $2 AND date = $3;
  `;
  console.log("input data", userId, foodId, inputDate);
  console.log(typeof userId, typeof foodId, typeof inputDate);
  const {result} = await pool.query(query, [userId, foodId,inputDate]);
  return result;
};

app.get("/api/users/:userId/weight", async(req, res) => {
  const userId = req.params.userId;
  await getWeight(userId)
    .then((weight) => res.json(weight))
    .catch((err) => {
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    });
});

app.post("/api/users/:userId/weight", async(req, res) => {
  const userId = req.params.userId;
  const weight = req.body.inputWeight;
  const date = req.body.inputDate;
  console.log("weight date", date);

  const { result } = await addWeight(userId, weight, date)
    .then(weight => res.json(weight));
  return result;
});

app.post("/api/users/:userId/weight/delete", async(req, res) => {
  console.log("here");
  const userId = req.params.userId;
  const date = req.body.inputDate;
  const {result} = await deleteWeight(userId, date)
    .then(weight => res.json(weight));
  return result;
});

app.get("/api/users/:userId/food", async(req, res) => {
  const userId = req.params.userId;
  await getFood(userId)
    .then((food) => res.json(food))
    .catch((err) => {
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    });
});

app.post("/api/users/:userId/food", async(req, res) => {
  const userId = req.params.userId;
  const foodData = req.body.foodData;
  const date = req.body.date;
  await addFood(userId, foodData, date)
    .then((food) => res.json(food))
    .catch((err) => {
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    });
});

app.post("/api/users/:userId/food/delete", async(req, res) => {
  const userId = req.params.userId;
  const foodId = req.body.foodId;
  const inputDate = req.body.inputDate;
  const {result} = await deleteFood(userId, foodId, inputDate)
    .then(food => res.json(food));
  return result;
});

app.get("/search_food", async(req, res) => {
  const query = req.query.food;
  console.log(query);
  fetch(`https://api.nal.usda.gov/fdc/v1/foods/search/?api_key=${API_KEY}&query=${query}`)
    .then(res =>{
      if (res.ok) {
        return res.json();
      }
      throw new Error('Something went wrong');
    })
    .then(data => {
      console.log("here 1");
      return res.send(data);
    });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
