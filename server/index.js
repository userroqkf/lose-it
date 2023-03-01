const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config()

app.use(cors());
app.use(express.json());

const API_KEY = process.env.NODE_ENV;

app.get("/api_key", async (req, res) => {
  const query = req.query.food
  fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${query}&dataType=Branded`)
    .then(res =>{
      console.log("fetching data nodejs")
      if (res.ok) {return res.json();}
      throw new Error('Something went wrong');
    })
    .then(data => res.send(data))
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});