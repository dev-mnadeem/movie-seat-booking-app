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
            },
            function(err, history) 
            {
                if (err) {
                  console.log(err);
                } else {
                  console.log(history);
                  res.render("paymentsummary.html", { paymentData: history });
                }
              }
    );
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