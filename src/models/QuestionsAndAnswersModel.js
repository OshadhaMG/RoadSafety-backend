const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answers: {
    A: { type: String, required: true },
    B: { type: String, required: true },
    C: { type: String, required: true },
    D: { type: String, required: true }
  },
  correct_answer: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    required: true
  },
  explanation: { type: String }
});

const Zone01 = mongoose.model('Zone01', QuestionSchema, 'zone01');
const Zone02 = mongoose.model('Zone02', QuestionSchema, 'zone02');
const Zone03 = mongoose.model('Zone03', QuestionSchema, 'zone03');
const Zone04 = mongoose.model('Zone04', QuestionSchema, 'zone04');
const Final = mongoose.model('Final', QuestionSchema, 'final');

module.exports = { Zone01, Zone02, Zone03, Zone04, Final };
