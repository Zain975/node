const mongoose = require("mongoose");

const TimezoneSchema = mongoose.Schema({
  timezone: { type: String },
});

module.exports = mongoose.model("Timezone", TimezoneSchema);
