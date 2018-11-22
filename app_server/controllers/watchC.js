module.exports.nothing3 = function(req, res) {
    res.render("watchhist.html", {
        watch1:[
            {
                id:1,
                cine_n:"Cinegold",
                movie_n:"Parwaz hai junoon",
                
            },
            {
                id:2,
                cine_n:"universal",
                movie_n:"jpna 2",
                
            }
        ]
    });
};