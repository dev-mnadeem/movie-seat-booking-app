const express = require("express");
const router = express.Router();
var ctrlLocations = require("../controllers/movie-list");
var ctrlLocations1 = require("../controllers/popC");
var ctrlLocations2 = require("../controllers/payC");
var ctrlLocations3 = require("../controllers/userC");
var ctrlLocations4 = require("../controllers/watchC");
//var ctrlOthers=require('../controllers/others');
var ctrlLocations5 = require("../controllers/cineC");
var ctrlLocations6 = require("../controllers/selectC");
var ctrlLocations7 = require("../controllers/landC");
var ctrlLocations8 = require("../controllers/sumC");

router.get("/index.html/:movie_title", ctrlLocations7.createCinema);
router.get("/", ctrlLocations7.test);
router.get("/landing.html", ctrlLocations7.test);
//router.get("/user.html", ctrlLocations3.create);
router.post("/pop.html/:movie_title", ctrlLocations1.savePop);
router.get("/pop.html/:movie_title", ctrlLocations1.nothing);
router.get("/payment.html", ctrlLocations2.nothing1);
router.get("/user.html", ctrlLocations3.nothing2);
router.get("/watchhist.html", ctrlLocations4.nothing3);
router.get("/cinemalist.html/:cinema_name", ctrlLocations5.savePop1);
router.get("/cinemalist.html", ctrlLocations5.nothing4);
router.get("/select.html/", ctrlLocations6.nothing5);
router.get("/select.html/:cinema_name", ctrlLocations6.nothingp);

//router.get("/landing.html", ctrlLocations7.test);
router.get("/paymentsummary.html", ctrlLocations8.createHistory);
router.post("/cinemalist.html", ctrlLocations5.savePop1);
//const movie=require('../models/showtimedb');;

//MINE
/*
router.post('/', (req, res, next) => {
const payment1=new pay_history({
 cinema_name : req.body.cinema_name,
 movie_name : req.body.movie_name,
 select_seats : req.body.select_seats,
 seat_type : req.body.seat_type,
 city : req.body.city
});*?
/*payment1.save()
.then()(result => {
console.log(result);
})
.catch(err =>console.log(err));
*/
//});

//router.get('/homePage', (req, res, next) => {
//logic for displaying movies list
//  movie.find(function(err,movie){
//   res.json(movie);

// })
//});
/*
router.post('/homePage', (req, res, next) => {
    let newMovie=new movie({
        id: req.body.id,
        name :req.body.name,
        location :req.body.location,
        capacity :req.body.capacity,
        reserved :req.body.reserved,
        silverPrice :req.body.silverPrice,
        goldPrice :req.body.goldPrice,
        rating: req.body.rating,
        description: req.body.description,
        
      
        id1: req.body.id1,
        title :req.body.title,
        description1: req.body.description1,
        genre: req.body.genre,
        rating1: req.body.rating1,
        language:req.body.language,
        time:req.body.time,
        date:req.body.date,
        reservedS:req.body.reservedS
        
    });
    newMovie.save((err,movie)=>{
        if(err)
        {
            res.json({msg: 'failed to add movie'+err});
        }
        else{
            res.json({msg: 'contact added succesfully'});
        }
    });
});
*/

module.exports = router;