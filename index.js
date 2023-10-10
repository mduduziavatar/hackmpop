const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const bcrypt = require('bcrypt'); // Include bcrypt for password hashing
const { Op } = require('sequelize'); // Include Sequelize operators
const generateAuthToken = require('./auth'); // Include your token generation function
const app = express();

const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}

const PORT = process.env.PORT || 3010;

// Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'my express flash string',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Sequelize setup and models
const sequelize = require('./config/database');
const Rental = require('./models/Rental');
const Entertainment = require('./models/Entertainment'); // Replace with your Entertainment model
const User = require('./models/user'); 

// Controllers
const rentalController = require('./controllers/rentalsController');
const entertainmentController = require('./controllers/entertainmentController');
const userController = require('./controllers/userController'); // Include the user controller

// Routes for Rentals
app.get('/:town/rentals/:rentalType/:itemType', rentalController.getRentalByItemType);

// Routes for Entertainment
app.get('/:town/entertainment/:entertainmentType/:itemType', entertainmentController.getEntertainmentByItemType);

// Routes for User 
app.post('/register', userController.registerUser);
app.post('/login', userController.loginUser);
app.put('/update-profile', userController.updateUserProfile);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Database connection and server start
sequelize.sync() // Sync Sequelize models with the database
  .then(() => {
    app.listen(PORT, () => {
      console.log('App starting on port: ' + PORT);
    });
  })
  .catch((error) => {
    console.error('Database synchronization error:', error);
  });
