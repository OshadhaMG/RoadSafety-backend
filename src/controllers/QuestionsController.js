// const { Zone01, Zone02, Zone03, Zone04 } = require('../models/QuestionsAndAnswersModel');

// const getZoneModel = (zoneName) => {
//   switch (zoneName.toLowerCase()) {
//     case 'zone01': return Zone01;
//     case 'zone02': return Zone02;
//     case 'zone03': return Zone03;
//     case 'zone04': return Zone04;
//     default: return null;
//   }
// };

// exports.bulkInsertAllZones = async (req, res) => {
//   const { Zone01: z1, Zone02: z2, Zone03: z3, Zone04: z4 } = req.body;
//   try {
//     await Zone01.insertMany(z1);
//     await Zone02.insertMany(z2);
//     await Zone03.insertMany(z3);
//     await Zone04.insertMany(z4);
//     res.status(201).json({ message: 'All zones inserted successfully!' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error inserting zones', error: err });
//   }
// };

// exports.insertIntoZone = async (req, res) => {
//     console.log('triggered======>')
//   const Model = getZoneModel(req.params.zoneName);
//   if (!Model) return res.status(400).json({ message: 'Invalid zone name' });


//   try {
//     await Model.insertMany(req.body);
//     res.status(201).json({ message: 'Questions added successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error adding questions', error: err });
//   }
// };

// exports.getZoneQuestions = async (req, res) => {
//   const Model = getZoneModel(req.params.zoneName);
//   if (!Model) return res.status(400).json({ message: 'Invalid zone name' });

//   try {
//     const questions = await Model.find();
//     res.json(questions);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching questions', error: err });
//   }
// };

// exports.updateQuestion = async (req, res) => {
//   const Model = getZoneModel(req.params.zoneName);
//   if (!Model) return res.status(400).json({ message: 'Invalid zone name' });

//   try {
//     const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updated) return res.status(404).json({ message: 'Question not found' });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating question', error: err });
//   }
// };

// exports.deleteQuestion = async (req, res) => {
//   const Model = getZoneModel(req.params.zoneName);
//   if (!Model) return res.status(400).json({ message: 'Invalid zone name' });

//   try {
//     const deleted = await Model.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: 'Question not found' });
//     res.json({ message: 'Question deleted' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting question', error: err });
//   }
// };


// controllers/QuestionsController.js
const { Zone01, Zone02, Zone03, Zone04 } = require('../models/QuestionsAndAnswersModel');
const Login = require('../models/LoginModel');
const Result = require('../models/ResultModel');

const getZoneModel = (zoneName) => {
  switch (zoneName.toLowerCase()) {
    case 'zone01': return Zone01;
    case 'zone02': return Zone02;
    case 'zone03': return Zone03;
    case 'zone04': return Zone04;
    default: return null;
  }
};

exports.bulkInsertAllZones = async (req, res) => {
  const { Zone01: z1, Zone02: z2, Zone03: z3, Zone04: z4 } = req.body;
  try {
    await Zone01.insertMany(z1);
    await Zone02.insertMany(z2);
    await Zone03.insertMany(z3);
    await Zone04.insertMany(z4);
    res.status(201).json({ message: 'All zones inserted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error inserting zones', error: err });
  }
};

exports.insertIntoZone = async (req, res) => {
  const Model = getZoneModel(req.params.zoneName);
  if (!Model) return res.status(400).json({ message: 'Invalid zone name' });

  try {
    await Model.insertMany(req.body);
    res.status(201).json({ message: 'Questions added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding questions', error: err });
  }
};

exports.getZoneQuestions = async (req, res) => {
  const Model = getZoneModel(req.params.zoneName);
  if (!Model) return res.status(400).json({ message: 'Invalid zone name' });

  try {
    const questions = await Model.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching questions', error: err });
  }
};

exports.updateQuestion = async (req, res) => {
  const Model = getZoneModel(req.params.zoneName);
  if (!Model) return res.status(400).json({ message: 'Invalid zone name' });

  try {
    const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Question not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating question', error: err });
  }
};

exports.deleteQuestion = async (req, res) => {
  const Model = getZoneModel(req.params.zoneName);
  if (!Model) return res.status(400).json({ message: 'Invalid zone name' });

  try {
    const deleted = await Model.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Question not found' });
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting question', error: err });
  }
};

// NEW — Save login data
exports.saveLogin = async (req, res) => {
  try {
    const { firstName, lastName, uid, school, grade } = req.body;

    if (!firstName || !lastName || !uid || !school || !grade) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const loginEntry = await Login.create({ firstName, lastName, uid, school, grade });
    res.status(201).json({ message: 'Login saved successfully', data: loginEntry });
  } catch (err) {
    res.status(500).json({ message: 'Error saving login', error: err });
  }
};

exports.saveResult = async (req, res) => {
  try {
    const { firstName, lastName, uid, score, zone } = req.body;

    if (!firstName || !lastName || !uid || !score || !zone) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const resultEntry = await Result.create({ firstName, lastName, uid, score, zone });
    res.status(201).json({ message: 'Login saved successfully', data: resultEntry });
  } catch (err) {
    res.status(500).json({ message: 'Error saving result', error: err });
  }
};