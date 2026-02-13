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
    const questions = await Model.find().limit(5);
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

// exports.saveResult = async (req, res) => {
//   try {
//     const { firstName, lastName, uid, score, zone, drivingCheckAnswers } = req.body;

//     // basic validation
//     if (
//       !firstName ||
//       !lastName ||
//       !uid ||
//       score === null || score === undefined || // allow 0
//       !zone ||
//       !drivingCheckAnswers ||
//       typeof drivingCheckAnswers !== 'object' ||
//       Array.isArray(drivingCheckAnswers)
//     ) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // conditional validation
//     const { hasDriven, drivenVehicleType, willingnessToDrive } = drivingCheckAnswers;

//     if (
//       !hasDriven ||
//       (hasDriven === 'yes' && !drivenVehicleType) ||
//       (hasDriven === 'no' && !willingnessToDrive)
//     ) {
//       return res.status(400).json({
//         message: 'Invalid driving check answers'
//       });
//     }

//     // normalize answers
//     const normalizedDrivingAnswers = {
//       hasDriven,
//       drivenVehicleType: hasDriven === 'yes' ? drivenVehicleType : null,
//       willingnessToDrive: hasDriven === 'no' ? willingnessToDrive : null
//     };

//     // save to DB
//     const resultEntry = await Result.create({
//       firstName,
//       lastName,
//       uid,
//       score,
//       zone,
//       drivingCheckAnswers: normalizedDrivingAnswers
//     });

//     return res.status(201).json({
//       message: 'Result saved successfully',
//       data: resultEntry
//     });

//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       message: 'Error saving result',
//       error: err.message
//     });
//   }
// };

exports.saveResult = async (req, res) => {
  try {
    const { firstName, lastName, uid, score, zone } = req.body;
    let { drivingCheckAnswers } = req.body;

    // parse if string
    if (typeof drivingCheckAnswers === 'string') {
      try {
        drivingCheckAnswers = JSON.parse(drivingCheckAnswers);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid drivingCheckAnswers JSON' });
      }
    }

    // basic validation
    if (
      !firstName ||
      !lastName ||
      !uid ||
      score === null || score === undefined || // allow 0
      !zone ||
      !drivingCheckAnswers ||
      typeof drivingCheckAnswers !== 'object' ||
      Array.isArray(drivingCheckAnswers)
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // conditional validation
    const { hasDriven, drivenVehicleType, willingnessToDrive } = drivingCheckAnswers;

    if (
      !hasDriven ||
      (hasDriven === 'yes' && !drivenVehicleType) ||
      (hasDriven === 'no' && !willingnessToDrive)
    ) {
      return res.status(400).json({
        message: 'Invalid driving check answers'
      });
    }

    const normalizedDrivingAnswers = {
      hasDriven,
      drivenVehicleType: hasDriven === 'yes' ? drivenVehicleType : null,
      willingnessToDrive: hasDriven === 'no' ? willingnessToDrive : null
    };

    const resultEntry = await Result.create({
      firstName,
      lastName,
      uid,
      score,
      zone,
      drivingCheckAnswers: normalizedDrivingAnswers
    });

    console.log("normalizedDrivingAnswers: ",normalizedDrivingAnswers)

    return res.status(201).json({
      message: 'Result saved successfully',
      data: resultEntry
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Error saving result',
      error: err.message
    });
  }
};


// exports.getTotalScore = async (req, res) => {
//   try {
//     const { firstName, lastName } = req.query;

//     // Validate required parameters
//     if (!firstName || !lastName) {
//       return res.status(400).json({ 
//         message: 'firstName and lastName are required as query parameters' 
//       });
//     }

//     // Find all results for this user across all zones
//     const results = await Result.find({ 
//       firstName: firstName.trim(), 
//       lastName: lastName.trim() 
//     }).sort({ zone: 1 }); // Sort by zone

//     // Check if user has any results
//     if (!results || results.length === 0) {
//       return res.status(404).json({ 
//         message: 'No results found for this user',
//         detail: `No quiz results found for ${firstName} ${lastName}`
//       });
//     }

//     // Calculate total score from all zones
//     const totalScore = results.reduce((sum, result) => {
//       return sum + (result.score || 0);
//     }, 0);

//     // Get individual zone scores
//     const zoneScores = results.map(result => ({
//       zone: result.zone,
//       score: result.score || 0
//     }));

//     // Calculate total possible questions (10 per zone * number of zones completed)
//     const totalQuestions = results.length * 10;

//     // Calculate percentage
//     const percentage = totalQuestions > 0 
//       ? ((totalScore / totalQuestions) * 100).toFixed(2) 
//       : 0;

//     // Send response
//     res.status(200).json({
//       success: true,
//       firstName: results[0].firstName,
//       lastName: results[0].lastName,
//       uid: results[0].uid,
//       totalScore,
//       totalQuestions,
//       zonesCompleted: results.length,
//       zoneScores,
//       percentage: parseFloat(percentage),
//       timestamp: new Date()
//     });

//   } catch (err) {
//     console.error('Error fetching total score:', err);
//     res.status(500).json({ 
//       message: 'Error fetching total score',
//       error: err.message 
//     });
//   }
// };

exports.getTotalScore = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    // Validate required parameters
    if (!firstName || !lastName) {
      return res.status(400).json({ 
        message: 'firstName and lastName are required in the request body' 
      });
    }

    // Find all results for this user across all zones
    const results = await Result.find({ 
      firstName: firstName.trim(), 
      lastName: lastName.trim() 
    }).sort({ zone: 1 }); // Sort by zone

    console.log("results: ",results)

    // Check if user has any results
    if (!results || results.length === 0) {
      return res.status(404).json({
        message: 'No results found for this user',
        detail: `No quiz results found for ${firstName} ${lastName}`
      });
    }

    // Calculate total score from all zones
    const totalScore = results.reduce((sum, result) => {
      return sum + (result.score || 0);
    }, 0);

    // Get individual zone scores
    const zoneScores = results.map(result => ({
      zone: result.zone,
      score: result.score || 0
    }));

    // Total questions = 10 per zone
    const totalQuestions = results.length * 5;

    // Calculate percentage
    const percentage = totalQuestions > 0 
      ? ((totalScore / totalQuestions) * 100).toFixed(2) 
      : 0;

    // Send response
    res.status(200).json({
      success: true,
      firstName: results[0].firstName,
      lastName: results[0].lastName,
      uid: results[0].uid,
      totalScore,
      totalQuestions,
      zonesCompleted: results.length,
      zoneScores,
      percentage: parseFloat(percentage),
      timestamp: new Date()
    });

  } catch (err) {
    console.error('Error fetching total score:', err);
    res.status(500).json({
      message: 'Error fetching total score',
      error: err.message 
    });
  }
};

