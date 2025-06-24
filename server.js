// // const express = require("express");
// // const mongoose = require("mongoose");
// // const bodyParser = require("body-parser");
// // const cors = require("cors");
// // const path = require("path");
// // const app = express();
// // require("dotenv").config();


// // const PORT = process.env.PORT || 8081;

// // app.use(cors());

// // app.use(bodyParser.json());
// // app.use(express.json());


// // //DB URL
// // const URL = process.env.MONGODB_URL;

// // mongoose.connect(URL, {
// // //   useCreateIndex: true,
// // useNewUrlParser: true,
// // useUnifiedTopology: true,
// // //   useFindAndModify: false,
// // });


// // const connection = mongoose.connection;
// // connection.once("open", () => {
// //   console.log("        <=== Database connected ! ====>");
// //   console.log(`<=== Running on URL: http://localhost:${PORT} ====>`);
// // });

// // app.listen(PORT, () => {
// //   console.log(`<=== Server is up and running on port ${PORT} ====>`);
// // });

// // const zoneRoutes = require('./src/routes/QuestionsRoutes.js')
// // app.use('/api', zoneRoutes);

// // const indexPath = path.join(__dirname, 'build', 'index.html');

// // app.get('*', (req, res) => {
// //   res.sendFile(indexPath, err => {
// //     if (err) {
// //       console.error('Error sending index.html:', err);
// //       res.status(500).send('Internal Server Error');
// //     }
// //   });
// // });

// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");
// const app = express();
// require("dotenv").config();

// const PORT = process.env.PORT || 8081;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());

// // Serve static files from build directory (if it exists)
// const buildPath = path.join(__dirname, 'build');
// app.use(express.static(buildPath));

// // DB URL
// const URL = process.env.MONGODB_URL;
// mongoose.connect(URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("        <=== Database connected ! ====>");
//   console.log(`<=== Running on URL: http://localhost:${PORT} ====>`);
// });

// // API Routes
// const zoneRoutes = require('./src/routes/QuestionsRoutes.js');
// app.use('/api', zoneRoutes);

// // // Catch-all handler: send back React's index.html file for client-side routing
// // const indexPath = path.join(__dirname, 'build', 'index.html');
// // app.get('*', (req, res) => {
// //   // Only serve index.html for non-API routes
// //   if (!req.path.startsWith('/api')) {
// //     res.sendFile(indexPath, err => {
// //       if (err) {
// //         console.error('Error sending index.html:', err);
// //         res.status(500).send('Internal Server Error');
// //       }
// //     });
// //   } else {
// //     res.status(404).json({ error: 'API endpoint not found' });
// //   }
// // });

// app.listen(PORT, () => {
//   console.log(`<=== Server is up and running on port ${PORT} ====>`);
// });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Serve static files from build directory
const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

// DB URL
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("        <=== Database connected ! ====>");
  console.log(`<=== Running on URL: http://localhost:${PORT} ====>`);
});

// API Routes
const zoneRoutes = require('./src/routes/QuestionsRoutes.js');
app.use('/api', zoneRoutes);

// Express v5 compatible catch-all route
const indexPath = path.join(__dirname, 'build', 'index.html');

// Use middleware instead of route for Express v5
app.use((req, res, next) => {
  // Skip if it's an API route
  if (req.path.startsWith('/api')) {
    return next();
  }
  
  // Skip if response already sent
  if (res.headersSent) {
    return next();
  }
  
  // Serve index.html for all other routes (SPA routing)
  res.sendFile(indexPath, err => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send('Internal Server Error');
    }
  });
});

app.listen(PORT, () => {
  console.log(`<=== Server is up and running on port ${PORT} ====>`);
});