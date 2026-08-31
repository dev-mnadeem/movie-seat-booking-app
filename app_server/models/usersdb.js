const mongoose = require('mongoose');
// Connecting is db.js's job, not a model's.
//
// This file used to call mongoose.connect() itself, hardcoded to
// `mongodb://localhost/usersdb`. Three model files each did that, naming three
// different databases — but mongoose has a single default connection, so the
// last call simply won and every model wrote to the same place. In a container
// the three localhost calls also failed outright, logging connection errors on
// every start while the app appeared to work.

const watch_schema=mongoose.Schema({
    cinema_name : {
        type : String,
        required : true

    },
    movie_name : {
        type : String,
        required : true

    },
    rating2 : {
        type : Number,
        required : true

    }
});

//define schema here
const user_schema=mongoose.Schema({

    id : {
        type : Number ,
        required : true

    },
    name : {
        type : String,
        required : true

    },
    password : {
        type : String,
        required : true

    },
    email: {
        type : String,
        required : true

    },
    city : {
        type : String,
        required : true

    },
    watchhist:[
        watch_schema
    ]

    
});


var usersdb1 = mongoose.model('usersdb1',user_schema);
module.exports = usersdb1;

module.exports = exports = mongoose;