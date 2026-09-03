// mongoose 7 removed callback support from model methods; these are promises
// now. The old driver (mongoose 5 / mongodb 3.1) also spoke the OP_QUERY
// opcode, which MongoDB 6 removed — every write failed with
// "Unsupported OP_QUERY command: insert" while the pages still rendered, so
// the application looked like it worked and persisted nothing.
var mongoose = require("mongoose");
var history = mongoose.model("history");
var create1= require("./popC");

module.exports.test = function(req, res) {
    res.render("landing.html", { status: "success" });
  };

module.exports.createHistory = function(req, res) {
    history.create(
      {
          price1: 90,
          seatNo:req.query.data,
          name:'GOLD',
          Date1: new Date(),
          movie:'The venom',
          tax1:2
            }
    )
      .then((history) => {
        res.render("paymentsummary.html", { paymentData: history });
      })
      .catch((err) => {
        console.error("failed to record payment history:", err.message);
        res.status(500).render("paymentsummary.html", { paymentData: null, error: err.message });
      });
};

/*module.exports.nothing7 = function(req, res) {
    res.render("paymentsummary.html", {
        date1 :"21-oct-2018",
        class1:"goldplus",
        sum1:
        [
            {
            
            movieN:"venom",
            quantity:2,
            price:13,
            total:26
            },
            {
                
                movieN:"taare zameen par",
                quantity:1,
                price:8,
                total:8
            }


        ]
        
        
    });
};*/