const express = require("express");
const cors = require("cors");
// eslint-disable-next-line no-unused-vars
const axios = require("axios");
require("dotenv").config();

const PORT = 8080;
const api_key = process.env.API_KEY;

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  console.log(req.query.cityName);
  const queryCity = req.query.cityName.trim();
  axios({
    method: "get",
    url: `https://api.openweathermap.org/data/2.5/weather`,
    params: {
      q: queryCity,
      units: "metric",
      lang: "pl",
      appid: api_key,
    },
  })
    .then((response) => res.json(response.data))
    .catch((e) => {
      res.status(404).json({ message: e.response.data.message });
    });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
