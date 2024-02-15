const router = require('express').Router(); 
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new comment route
router.post('/', withAuth, async (req, res) => { // defines a new POST route for creating a new comment. It uses the withAuth middleware, which means the user must be authenticated to access this route

  try {

    const newComment = await Comment.create({ // create a new comment in the database using the Comment.create method. The comment data is taken from the request body (req.body), and the user_id is set based on the currently authenticated user (req.session.user_id)
      ...req.body, 
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment); // If successful, it responds with a status code of 200 (OK) and a JSON object containing the newly created comment
    

  } catch (err) {
    
    res.status(400).json(err); // If there's an error (e.g., validation error), it responds with a status code of 400 (Bad Request) and sends the error details in the response JSON

  }

});

// Edit an existing comment route
// router.put('/:id', withAuth, async (req, res) => {

//   try {
    

//   } catch (err) {
    
//     res.status(400).json(err); // If there's an error (e.g., validation error), it responds with a status code of 400 (Bad Request) and sends the error details in the response JSON

//   }

// });

// // Delete a comment route
// router.delete('/:id', withAuth, async (req, res) => {

//   try {
    

//   } catch (err) {
    
//     res.status(400).json(err); // If there's an error (e.g., validation error), it responds with a status code of 400 (Bad Request) and sends the error details in the response JSON

//   }
// });

module.exports = router; // exports the configured router, making it available for use in other parts of the application