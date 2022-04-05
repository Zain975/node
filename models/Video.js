const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: { type: String },
  videoUrl: { type: String },
});

module.exports = mongoose.model("Video", VideoSchema);
