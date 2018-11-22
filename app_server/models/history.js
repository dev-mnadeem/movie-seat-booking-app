const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/history');

var history1= mongoose.Schema({
    price1:
    {
        type: Number,
        required: true
    },
    seatNo:
    {
        type:Number,
        required:true
    },
    name:
    {
        type:String,
        required:true
    },
    Date1:
    {
        type:Date,
        required:true
    },
    movie: { 
        type:String,
        required:true
    },
    tax1:
    {
        type: Number,
        required:true
    }
});

var history = mongoose.model("history",history1);
module.exports = history;
