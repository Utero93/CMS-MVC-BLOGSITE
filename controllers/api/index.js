const router = require('express').Router(); // imports the 'Router' class from the express module and creates a new instance of it

// import routes that contain handlers for user, post, and comment-related routes
const userRoutes = require('./userRoutes'); 
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// mount the imported route handlers under specific base paths:
router.use('/dashboard', userRoutes);
router.use('/post', postRoutes); 
router.use('/comment', commentRoutes); 

module.exports = router; // export the configured router