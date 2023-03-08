const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// const API_KEY = process.env.NODE_ENV;
const API_KEY = "s99Gif3tGh1LNr63BgQULwOxS2zveA4k81MHoTm8";

app.get("/api_key", async(req, res) => {
  console.log("here 1");
  const query = req.query.food;
  fetch(`https://api.nal.usda.gov/fdc/v1/foods/search/?api_key=${API_KEY}&query=${query}`)
    .then(res =>{
      console.log("here 2");
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