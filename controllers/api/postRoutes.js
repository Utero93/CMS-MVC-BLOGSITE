// Import dependencies
const router = require('express').Router(); 
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Get all posts for a user route
router.get('/', async (req, res) => { // The route is specified as '/', meaning it corresponds to the root path (api/posts/)

  try {
    
    const postData = await Post.findAll({ // use the Sequelize findAll method to query the database for all posts. The query includes an association with the User model, specifying that the associated user's username attribute should be included in the results
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    }); 

    res.status(200).json(postData); // If the database query is successful, it responds with a status code of 200 (OK) and a JSON object containing the retrieved post data

  } catch (err) {
    
    res.status(500).json(err); // If an error occurs during the execution of the try block (e.g., a database error), it catches the error. It then responds with a status code of 500 (Internal Server Error) and sends the error details in the response JSON

  }

});

// get one post by ID route
router.get('/:id', withAuth, async (req, res) => { // The route is specified with a parameter :id, representing the id of the post to be retrieved (example: '/post/3')

  try {
    
    const postData = await Post.findByPk(req.params.id, { // use the Sequelize findByPk method to query the database for a specific post based on the id parameter (req.params.id). The query includes associations with the User model to retrieve the post's author username and the Comment model with an association to the User model to retrieve the username of the comment authors
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
          ]
        }
      ]
    });

    if (!postData){ // After the database query, it checks if the postData value is falsy. If no post is found (falsy), it responds with a status code of 404 (Not Found) and a JSON object containing an appropriate error message 
      res.status(404).json({ message: 'No post found with that id!'});

    };

    res.status(200).json(postData); // If the post is found, it responds with a status code of 200 (OK) and a JSON object containing the retrieved post data, including the associated user's username and comments with associated usernames
    
  } catch (err) {
    
    res.status(500).json(err); // If an error occurs during the execution of the try block (e.g., a database error), catch the error. then respond with a status code of 500 (Internal Server Error) and sends the error details in the response JSON

  }

});

// Create a new post route /api/post
router.post('/', withAuth, async (req, res) => { // defines a new POST route for creating a new post. It uses the withAuth middleware, which means the user must be authenticated to access this route

  try {

    const newPost = await Post.create({ // create a new post in the database using the Post.create method. The post data is taken from the request body (req.body), and the user_id is set based on the currently authenticated user (req.session.user_id)
      ...req.body,
      user_id: req.session.user_id,
    });

    // console.log('New Post:', newPost);

    res.status(200).json(newPost); // If successful, it responds with a status code of 200 (OK) and a JSON object containing the newly created post

  } catch (err) {

    res.status(400).json({ error: 'Bad Request', details: err.message });
 // If there's an error (e.g., validation error), it responds with a status code of 400 (Bad Request) and sends the error details in the response JSON

  }
});

// Update an existing post w/ user edits route
router.put('/:id', withAuth, async (req, res) => { //  route is specified as '/put/:id', where :id is a route parameter representing the id of the post to be updated. It also uses the withAuth middleware, ensuring that the user must be authenticated to access this route

  try {

    const editedPost = await Post.update(req.body, { // update a post in the database using the Post.update method. It takes the data from the request body (req.body) and updates the post where the id matches the value provided in the route parameter (req.params.id)
      where: { id: req.params.id }
    });

    if (!editedPost){ // After attempting the update, it checks if the editedPost value is falsy. If the post is not found (falsy), it responds with a status code of 404 (Not Found) and a JSON object containing an appropriate error message
      res.status(404).json({ message: 'No post found with that id!'})
    }

    res.status(200).json(editedPost); // If the post is successfully updated, it responds with a status code of 200 (OK) and a JSON object containing information about the edited post
    
  } catch (err) {
    
    res.status(500).json(err); // If an error occurs during the execution of the try block (e.g., a database error), it catches the error. It then responds with a status code of 500 (Internal Server Error) and sends the error details in the response JSON

  }

});

// Delete a specific post based on id route
router.delete('/:id', withAuth, async (req, res) => { // This line defines a new DELETE route for deleting a post. It also uses the withAuth middleware to ensure the user is authenticated

  try {
    // Make sure all comments related to post that is being deleted, are also deleted. 
    await Comment.destroy({
    where: { post_id: req.params.id },
    });

    const postData = await Post.destroy({ // delete a specific post from the database using the Post.destroy method. It looks for a post with the specified id (req.params.id) and checks that the post belongs to the currently authenticated user (req.session.user_id)
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) { // If no post is found with the specified id, it responds with a status code of 404 (Not Found) and a corresponding message.
      res.status(404).json({ message: 'No post found with this id!' });

      return;

    }

    res.status(200).json(postData); // If a post is successfully deleted, it responds with a status code of 200 (OK) and a JSON object containing information about the deleted post

  } catch (err) {

    res.status(500).json(err); // If there's an error during the deletion process, it responds with a status code of 500 (Internal Server Error) and sends the error details in the response JSON

  }
});

module.exports = router; // exports the configured router, making it available for use in other parts of the application