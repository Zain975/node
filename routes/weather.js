const router = require("express").Router();
const dotenv = require("dotenv");
const fetch = require("node-fetch");
dotenv.config();

// const apiKey = `${process.env.API_KEY}`;

router.get("/lat&lon", async (req, res) => {
  if (!req.query.lat) {
    res.status(404).json("lat is missing");
  } else if (!req.query.lon) {
    res.status(404).json("lon is missing");
  } else {
    let lat = req.query.lat;
    let lon = req.query.lon;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
    );

    const data = await response.json();
    res.status(200).json(data);
  }
});

module.exports = router;
