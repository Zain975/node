const mongoose = require("mongoose");

const AudioSchema = new mongoose.Schema({
  title: { type: String },
  audioUrl: { type: String },
});

module.exports = mongoose.model("Audio", AudioSchema);
