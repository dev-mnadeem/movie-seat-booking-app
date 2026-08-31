const mongoose = require("mongoose");
// Connecting is db.js's job, not a model's.
//
// This file used to call mongoose.connect() itself, hardcoded to
// `mongodb://localhost/showtimedb`. Three model files each did that, naming three
// different databases — but mongoose has a single default connection, so the
// last call simply won and every model wrote to the same place. In a container
// the three localhost calls also failed outright, logging connection errors on
// every start while the app appeared to work.
//define schema here
var time_schema = mongoose.Schema({
  time1: {
    type: Date,
    required: true
  },
  date1: {
    type: Date,
    required: true
  },
  reservedS: {
    type: Number,
    required: true
  }
});
var movie_schema = mongoose.Schema({
  movieid: {
    type: Number
  },
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  rating1: {
    type: Number,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description1: {
    type: String,
    required : true
  },
  timeS: [time_schema]
});

var cin_schema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  cinema_name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  reserved: {
    type: Number,
    required: true
  },

  goldPrice: {
    type: Number,
    required: true
  },
  silverPrice: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  description: {
    type: String
    //required : true
  },
  movList: [movie_schema]
});

var Cinema = mongoose.model("Cinema", cin_schema);
module.exports = Cinema;
