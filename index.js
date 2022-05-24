const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var mapp = require("./mapp");
var http = require("http");
var robot = require("robotjs");
var os = require("os");
var handleSocketEvents = require("./socket");

const authRoute = require("./routes/auth");
const audioRoute = require("./routes/audio");
const videoRoute = require("./routes/video");
const weatherRoute = require("./routes/weather");
const timezoneRoute = require("./routes/timezone");
const backgroundImgRoute = require("./routes/frontBg");

dotenv.config();
const port = process.env.PORT || 8000;
const connection_url =
  "mongodb+srv://admin:1133557799@cluster0.59mxf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(connection_url || process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

/**
 * Get port from environment and store in Express.
 */

//  var port = normalizePort(process.env.PORT || '4000');
mapp.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(mapp);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, "0.0.0.0");
server.on("error", onError);
server.on("listening", onListening);

var io = require("socket.io")(server);

io.on("connection", (socket) => {
  handleSocketEvents(socket, robot);
  console.log("someon connected");
});

const ifaces = os.networkInterfaces();
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  Object.keys(ifaces).forEach((ifname) =>
    ifaces[ifname].forEach((iface) => {
      if (!iface.internal && iface.family === "IPv4")
        console.log(
          `Can access on your network with this http://${iface.address}:${port}`
        );
    })
  );
}

// app.get("/", (req, res) => res.status(200).send("hello world"));
app.use("/api/auth", authRoute);
app.use("/api/uploads", audioRoute);
app.use("/api/uploads", videoRoute);
app.use("/api/weather", weatherRoute);
app.use("/api/timezone", timezoneRoute);
app.use("/api/setBackground", backgroundImgRoute);

app.listen(port, () => {
  console.log("server is running");
});
