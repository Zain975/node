const router = require("express").Router();
const dotenv = require("dotenv");
const Weather = require("../models/Weather");
const fetch = require("node-fetch");
dotenv.config();

// post lat and lon in DB
router.post("/setLat&Lon", async (req, res, err) => {
  try {
    const weather = await Weather.create({
      lat: req.body.lat,
      lon: req.body.lon,
    });
    return res.status(200).json({
      status: true,
      data: weather,
      msg: "Successfully saved",
    });
  } catch (err) {
    return res.status(200).json({ status: false, message: err });
  }
});

// Update lat and lon

router.put("/updateLat&Lon", async (req, res) => {
  const weatherId = "62539b21cbc708a219b703f9";
  const weather = await Weather.findByIdAndUpdate(weatherId);
  if (weather) {
    weather.lat = req.body.lat;
    weather.lon = req.body.lon;
    const updatedWeather = await weather.save();
    res
      .status(200)
      .json({ status: true, message: "Successfully updated!", data: weather });
  }
});

// Get weather from weather Api

router.get("/lat&lon", async (req, res) => {
  const weatherId = "62539b21cbc708a219b703f9";
  const weather = await Weather.findById(weatherId);
  if (!weather.lat) {
    res.status(404).json("lat is missing");
  } else if (!weather.lon) {
    res.status(404).json("lon is missing");
  } else {
    let lat = weather.lat;
    let lon = weather.lon;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`
    );

    const data = await response.json();
    res
      .status(200)
      .json({ status: true, message: "Succesfull", data: data.main.temp });
  }

  // if (!req.query.lat) {
  //   res.status(404).json("lat is missing");
  // } else if (!req.query.lon) {
  //   res.status(404).json("lon is missing");
  // } else {
  //   let lat = req.query.lat;
  //   let lon = req.query.lon;

  //   const response = await fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
  //   );

  //   const data = await response.json();
  //   res.status(200).json({ status: true, message: "Succesfull", data: data });
  // }
});

module.exports = router;
