const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ticketing';
void mongoose.connect(dbURI, { serverSelectionTimeoutMS: 10000 }).catch(() => undefined);
require('./showtimedb');
require('./payment');
require('./usersdb');
require('./history');
module.exports = mongoose;
