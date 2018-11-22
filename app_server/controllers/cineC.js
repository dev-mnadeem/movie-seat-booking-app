var mongoose = require("mongoose");
var payment = mongoose.model("history");
var request= require("request");

module.exports.savePop1=function(req,res)
{
    
};
module.exports.nothing4 = function(req, res) {
    res.render("cinemalist.html", {
        cinema1:
        [
            {
              id:1,
              name:"s1",
              location:"xyz",
              capacity:2,
              reserved:4,
              goldP:45,
              silverP:67,
              rating:4.5,
              description:"sdjkkkkk"
            }
            ,
            {
              
                id:2,
              name:"sds",
              location:"xdfd",
              capacity:3,
              reserved:2,
              goldP:452,
              silverP:627,
              rating:3.5,
              description:"sdjk2333333333333kkkk"
              
            },
            {
              
                
                id:4,
              name:"s1fdf",
              location:"xysdfz",
              capacity:2,
              reserved:4,
              goldP:45,
              silverP:67,
              rating:4.5,
              description:"sdjsdfsdfkkkkk"
              
            } 
          
        ]
    
        
    });
};