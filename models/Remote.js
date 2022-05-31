const mongoose = require("mongoose");

const RemoteSchema = mongoose.Schema({
  link: { type: String },
});

module.exports = mongoose.model("Remote", RemoteSchema);
