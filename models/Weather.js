const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
  lat: { type: String },
  lon: { type: String },
});

module.exports = mongoose.model("Weather", WeatherSchema);
