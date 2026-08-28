// Inserts the 20 "final" zone questions into the `final` collection.
// Usage: node src/seeds/seedFinalZone.js
// Safe to re-run: it skips questions that are already in the collection.

const mongoose = require('mongoose');
require('dotenv').config();

const questions = require('./finalZoneQuestions');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('<=== Database connected ! ====>');

    const { Final } = require('../models/QuestionsAndAnswersModel');

    const existing = await Final.find({}, 'question').lean();
    const existingQuestions = new Set(existing.map(q => q.question));

    const toInsert = questions.filter(q => !existingQuestions.has(q.question));

    if (toInsert.length === 0) {
      console.log('All 20 final zone questions are already present. Nothing to insert.');
    } else {
      const inserted = await Final.insertMany(toInsert);
      console.log(`Inserted ${inserted.length} question(s) into the "final" collection.`);
    }

    console.log(`Total questions in "final": ${await Final.countDocuments()}`);
  } catch (err) {
    console.error('Error seeding final zone:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
