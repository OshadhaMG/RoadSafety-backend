const mongoose = require('mongoose');
const { resultDB } = require('../config/dbConnections');

const ResultSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  uid: { type: String, required: true },
  score: { type: Number, required: true },
  zone: { type: String, required: true },
  drivingCheckAnswers: { type: JSON, required: true }
});

module.exports = resultDB.model('Result', ResultSchema, 'result');
