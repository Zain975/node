const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const audioRoute = require("./routes/audio");
const videoRoute = require("./routes/video");

dotenv.config();
const port = process.env.PORT || 8000;
const uri = process.env.MONGO_URL;
mongoose.connect(
  "mongodb+srv://admin:1133557799@cluster0.59mxf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ||
    uri
);

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => res.status(200).send("hello world"));
app.use("/api/auth", authRoute);
app.use("/api/uploads", audioRoute);
app.use("/api/uploads", videoRoute);

app.listen(port, () => {
  console.log("server is running");
});
