var mongoose = require("mongoose");

// The production URI used to be a hardcoded connection string complete with
// username and password, committed in plain text. It pointed at mLab, which
// shut down in 2018, so the host is long gone — but the credential is still in
// this repository's git history and should be treated as disclosed.
var dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/ticketing";

mongoose.connect(dbURI);
mongoose.Promise = global.Promise;
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

require("./showtimedb");
require("./payment");
require("./usersdb");
require("./history");
