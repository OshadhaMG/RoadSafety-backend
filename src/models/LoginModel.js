// // models/LoginModel.js
// const mongoose = require('mongoose');

// const LoginSchema = new mongoose.Schema({
//   studentName: { type: String, required: true },
//   school: { type: String, required: true },
//   grade: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// // database is 'authentication', collection is 'login'
// module.exports = mongoose.model('Login', LoginSchema, 'login');

const mongoose = require('mongoose');
const { authDB } = require('../config/dbConnections');

const LoginSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  uid: { type: String, required: true },
  school: { type: String, required: true },
  grade: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = authDB.model('Login', LoginSchema, 'login');
