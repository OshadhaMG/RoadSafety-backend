const mongoose = require('mongoose');

const quizDB = mongoose.connection; // uses the default connection from server.js

const authDB = mongoose.createConnection(
  'mongodb+srv://admin:roadSafetyAdmin8046@roadsafety.3vdbins.mongodb.net/authentication?retryWrites=true&w=majority&appName=roadSafety',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

module.exports = { quizDB, authDB };
