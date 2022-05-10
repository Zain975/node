const mongoose = require("mongoose");

const WallpaperSchema = new mongoose.Schema({
  img: { type: String },
});

module.exports = mongoose.model("Wallpaper", WallpaperSchema);
