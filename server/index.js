const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
require('dotenv').config();
const { Pool } = require('pg');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const pool = new Pool({
  host: 'localhost',
  user: 'kimjon0509',
  password: '5431',
  database: 'loseit'
});

// const API_KEY = process.env.NODE_ENV;
const API_KEY = "s99Gif3tGh1LNr63BgQULwOxS2zveA4k81MHoTm8";

//Need to refactor this into another file later
const getFood = async(userId, date) => {
  // Define the SQL query to fetch the food data
  const query = `
    SELECT *
    FROM foods
    WHERE owner_id = $1 AND date = $2;
  `;
  const { rows } = await pool.query(query, [userId, date]);

  return rows;
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

const postWeight = async(userId, weight, date) => {
  const query = `
    INSERT INTO weights (owner_id, weight, date)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const { result } = await pool.query(query, [userId, weight, date]);
  return result;
};

app.post("/api/users/:userId/weight", async(req, res) => {
  const userId = req.params.userId;
  const weight = req.body.inputWeight;
  const date = req.body.inputDate;
  console.log("weight date", date);

  const { result } = await postWeight(userId, weight, date)
    .then(weight => res.json(weight));
  return result;
});


app.get("/api/users/:userId/weight", async (req, res) => {
  const userId = req.params.userId;
  await getWeight(userId,)
    .then((weight) => res.json(weight))
    .catch((err) => {
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    });
});


app.get("/api/users/:userId/food", async (req, res) => {
  console.log(req.query.date);
  const userId = req.params.userId;
  const date = req.query.date;
  await getFood(userId, date)
    .then((food) => res.json(food))
    .catch((err) => {
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    });
});

app.get("/search_food", async(req, res) => {
  const query = req.query.food;
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