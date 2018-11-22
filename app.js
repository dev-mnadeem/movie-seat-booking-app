var express = require("express");
var mongoose = require("mongoose");
var db1 = require("./app_server/models/db");
var http = require("http");
var bodyParser = require('body-parser');
//var bodyparser = require('body-parser');
//var cors = require("cors");

var path = require("path");
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
const route = require("./app_server/routes/route");

app.set("views", path.join(__dirname, "app_server", "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

//adding static files
app.use(express.static(path.join(__dirname, "public")));
//routes

app.use("/", route);
global.globalString = "This can be accessed anywhere!";  
//app.use("/api", route1);
//connect to mongodb
//mongoose.connect("mongodb://localhost:27017/ticketing_web");
/*var dbURI = "mongodb://localhost:27017/ticketing_web";

if (process.env.NODE_ENV === "production") {
  //just to test I have placed this url
   //dbURI = "mongodb://shamsa:shamsa123@ds263571.mlab.com:63571/loc8r";
}
mongoose.connect(
  dbURI,
  { useNewUrlParser: true }
);

//on connection
mongoose.connection.on("connected", () => {
  console.log("connected to db mongodb");
});

//on error
mongoose.connection.on("error", err => {
  if (err) {
    console.log("error in db connection" + err);
  }
});
*/
//testing server
/*
app.get("/", (req, res) => {
  res.send("foobar");
});
app.listen(port, () => {
  console.log("server started at port no :" + port);
});
*/
var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

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
