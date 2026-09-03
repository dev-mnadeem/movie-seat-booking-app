
var mongoose = require("mongoose");
var usersdb1 = mongoose.model("usersdb1");
module.exports.nothing2 = function(req, res) {
    // Render the account page. Nothing else.
    //
    // This handler used to do two things wrong. It called res.render() at the
    // top and then again inside a database callback, so a successful request
    // tried to send two responses and threw ERR_HTTP_HEADERS_SENT. And between
    // the two it inserted a hardcoded user — name "ujh,buj", password "yv" —
    // into the database on every GET of this page. A GET should not write, and
    // it certainly should not write that.
    res.render("user.html", {
        user_n: "Mark",
        city: "Karachi",
        email: "markZucker@gmail.com",
        phone: "0321-3245237"
    });
};
/*module.exports.createUser = function(req, res) {
    console.log("sdad");
    usersdb1.create(
      {
          id:2,
          name: "ujh,buj",
          password:"yv",
          email:"uhygu@d.gg",
          city:"hgu"
      },
      function(err, usersdb1) {
        if (err) {
          console.log(err);
        } else {
          console.log(usersdb1);
          res.render("user.html", { userData: usersdb1 });
        }
      }
      )};*/