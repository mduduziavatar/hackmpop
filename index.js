const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const app = express();
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

// Database
const db = require('./db');

// Models and Controllers
const rentalController = require('./controllers/rentalController');
const entertainmentController = require('./controllers/entertainmentController');

// Routes for Rentals
app.get('/:town/rentals/:rentalType/:itemType', rentalController.getRentalByItemType);

// Routes for Entertainment
app.get('/:town/entertainment/:entertainmentType/:itemType', entertainmentController.getEntertainmentByItemType);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log('App starting on port: ' + PORT);
});