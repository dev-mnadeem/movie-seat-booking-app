module.exports.nothingp = function(req, res) {
  
    globalString+= req.params.cinema_name;
    console.log(globalString);
}

module.exports.nothing5 = function(req, res) {
    
    res.render("select.html", {
        select1:
        [
            {
              movie_name:"the nun",
              dates:["12-oct-2018","18-oct-2019","31-dec-2020"],
              times:["11:00","2:00","13:01","21:00"]
            }
            ,
            {
              
                movie_name:"the nun1",
              dates:["12-oct-2018","19-oct-2019","31-dec-2020"],
              times:["11:00","3:00","13:01","21:00"]
              
            },
            {
              
                
                movie_name:"the nun2",
              dates:["12-oct-2018","20-oct-2019","31-dec-2020"],
              times:["11:00","4:00","13:01","21:00"]
              
            } 
          
        ]
    
        
    });
    
};