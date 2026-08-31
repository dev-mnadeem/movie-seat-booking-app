const mongoose = require('mongoose');
// Connecting is db.js's job, not a model's.
//
// This file used to call mongoose.connect() itself, hardcoded to
// `mongodb://localhost/history`. Three model files each did that, naming three
// different databases — but mongoose has a single default connection, so the
// last call simply won and every model wrote to the same place. In a container
// the three localhost calls also failed outright, logging connection errors on
// every start while the app appeared to work.

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
