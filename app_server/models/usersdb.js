const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/usersdb');

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