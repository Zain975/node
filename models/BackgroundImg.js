const mongoose = require("mongoose");

const BackgroundImgSchema = new mongoose.Schema({
  imgUrl: { type: String },
});

module.exports = mongoose.model("BackgroundImg", BackgroundImgSchema);
