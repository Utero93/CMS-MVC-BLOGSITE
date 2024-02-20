// Import Dependencies                   
const router = require('express').Router(); // import express library and set up router
const { User, Post, Comment } = require('../models'); // import models 
const withAuth = require('../utils/auth'); // import custom middleware

// Handles root route ('/'), fetching all posts with associated usernames
router.get('/', async (req, res) => {

  try {

    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });

  } catch (err) {

    res.status(500).json(err); // If an error occurs during the execution of the try block (e.g., a database error), it catches the error. It then responds with a status code of 500 (Internal Server Error) and sends the error details in the response JSON

  }
});

// Handles a route for displaying a single post ('/post/:id'), requiring authentication
router.get('/post/:id', withAuth, async (req, res) => {

  try {
     
    // Fetch the post and associated user data by post ID
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [
            {
              model: User, 
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    const post = postData.get({ plain: true });

    // Render the 'post' template with serialized post data and session information.
    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });

  } catch (err) {

    res.status(500).json(err); // If an error occurs during the execution of the try block (e.g., a database error), it catches the error. It then responds with a status code of 500 (Internal Server Error) and sends the error details in the response JSON

  }
});

// Handles the '/dashboard' route, requiring authentication
router.get('/dashboard', withAuth, async (req, res) => {

  try {

    // Find the logged in user based on the session ID and their associated posts
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    // Render the 'dashboard' template with serialized user data and session information
    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in
    });

  } catch (err) {

    res.status(500).json(err); // If an error occurs during the execution of the try block (e.g., a database error), it catches the error. It then responds with a status code of 500 (Internal Server Error) and sends the error details in the response JSON
    
  }
});

// Handle route to render login form
router.get('/login', (req, res) => {

  res.render('login');

});

// Handle route to render signup form
router.get('/signup', (req, res) => {

  res.render('signup');

});

// Handle the route for editing a post ('/editpost/:id')
router.get('/edit-post/:id', async (req, res) => {

  try {

    // Fetch the post, its author, and associated comments
    const postData =  await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment, 
          include: [
            {
              model: User,
              attributes: ['username'] 
            }
          ],
        },
      ],
    });

    console.log(postData.toString());

    
    if (!postData){ // After the database query, check if the postData value is falsy. If no post is found (falsy), respond with a status code of 404 (Not Found) and a JSON object containing an appropriate error message 
      console.log('Post not found');
      res.status(404).json({ message: 'No post found with that id!'});

    };

    const post = postData.get({ plain: true });
    // Renders the 'edit-post' template with serialized post data and session information
    console.log('Rendering edit-post template with post data:', post);

    res.render('edit-post', {
      ...post,
      logged_in: req.session.logged_in 
    });
    
  } catch (err) {

    console.error('Error rendering editpost template:', err);

    res.status(500).json(err); // If an error occurs during the execution of the try block (e.g., a database error), catch the error. then respond with a status code of 500 (Internal Server Error) and sends the error details in the response JSON

  }

}); 

module.exports = router;