const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const audioRoute = require("./routes/audio");
const videoRoute = require("./routes/video");

dotenv.config();

mongoose.connect(
  "mongodb://admin:1133557799@cluster0.59mxf.mongodb.net/FirstDatabase?retryWrites=true&w=majority" ||
    process.env.MONGO_URL
);

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/uploads", audioRoute);
app.use("/api/uploads", videoRoute);

app.listen(8000, () => {
  console.log("server is running");
});
