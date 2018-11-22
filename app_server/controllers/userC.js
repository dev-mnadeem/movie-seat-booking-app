
var mongoose = require("mongoose");
var usersdb1 = mongoose.model("usersdb1");
module.exports.nothing2 = function(req, res) {
    res.render("user.html", {
        user_n:"Mark",
        city:"Karachi",
        email:"markZucker@gmail.com",
        phone:"0321-3245237"


    }),
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
    )
    
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