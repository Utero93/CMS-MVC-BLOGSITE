const path = require('path'); // provides utilities for working w/file & directory paths
const express = require('express'); // express, framework for node.js
const session = require('express-session'); // middleware for handling sessions in express.js
const exphbs = require('express-handlebars'); // template engine for express.js
const routes = require('./controllers'); // routes for the app, imported from the 'controllers' file

const sequelize = require('./config/connection'); // import sequelize instance
const SequelizeStore = require('connect-session-sequelize')(session.Store); // allows session data to be stored in the db

const app = express(); // create instance of express application
const PORT = process.env.PORT || 3001; // sets port number either the one specified in 'PORT' environment variable or default to '3001'

const hbs = exphbs.create({ helpers: require("./utils/helpers") }); // handlebars.js engine w/custom helper functions

const sess = { // defines session config object w/secret key, cookie settings and sequelize store
  secret: 'Very secret',
  cookie: {
    maxAge: 500000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false, 
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess)); // adds session middleware to express app from the 'sess' object above

// Inform Express.js to use Handlebars as template engine
app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars');

// setting up middleware for handling JSON and URL-encoded data, and serve static files from 'public' directory
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes); // adds routes defined in './controllers' file to express app

// synchronize Sequelize models w/ the database and starts express app running on specified port
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on: http://localhost:${PORT}`));
});