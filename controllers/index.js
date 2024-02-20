const router = require('express').Router(); // imports the 'Router' class from the express module and creates a new instance of it

// import routes that contain handlers for api and home-related routes
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// mount the imported route handlers under specific base paths:
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router; // export the configured router