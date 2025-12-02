// const express = require('express');

// const Controller = require("../controllers/QuestionsController.js")

// const router = express.Router();

// router.post('/zones', Controller.bulkInsertAllZones);
// router.post('/zone/:zoneName', Controller.insertIntoZone);
// router.get('/zone/:zoneName', Controller.getZoneQuestions);
// router.put('/zone/:zoneName/:id', Controller.updateQuestion);
// router.delete('/zone/:zoneName/:id', Controller.deleteQuestion);

// module.exports = router;


// routes/index.js
const express = require('express');
const Controller = require("../controllers/QuestionsController.js");

const router = express.Router();

router.post('/zones', Controller.bulkInsertAllZones);
router.post('/zone/:zoneName', Controller.insertIntoZone);
router.get('/zone/:zoneName', Controller.getZoneQuestions);
router.put('/zone/:zoneName/:id', Controller.updateQuestion);
router.delete('/zone/:zoneName/:id', Controller.deleteQuestion);

// NEW route for login
router.post('/login', Controller.saveLogin);

router.post('/result', Controller.saveResult);
router.post('/total-score', Controller.getTotalScore); // NEW ROUTE

module.exports = router;
