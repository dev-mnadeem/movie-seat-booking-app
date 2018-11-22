const mongoose = require('mongoose');
var pay_history=mongoose.Schema({

    cinema_name : {
        type : String,
       // required : true

    },
    movie_name : {
        type : String,
        required : true

    },
    select_seats : {
        type : Number,
        //required : true
    },
    seat_type : {
        type: String,
        //required:true

    },
    city : {
        type:String,
       // required:true

    }
});



var payment1 = mongoose.model("payment1", pay_history);
module.exports = payment1;