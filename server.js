const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8081;

app.use(cors());

app.use(bodyParser.json());
app.use(express.json());


//DB URL
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
//   useCreateIndex: true,
useNewUrlParser: true,
useUnifiedTopology: true,
//   useFindAndModify: false,
});


const connection = mongoose.connection;
connection.once("open", () => {
  console.log("        <=== Database connected ! ====>");
  console.log(`<=== Running on URL: http://localhost:${PORT} ====>`);
});

app.listen(PORT, () => {
  console.log(`<=== Server is up and running on port ${PORT} ====>`);
});

const zoneRoutes = require('./src/routes/QuestionsRoutes.js')
app.use('/api', zoneRoutes);

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


