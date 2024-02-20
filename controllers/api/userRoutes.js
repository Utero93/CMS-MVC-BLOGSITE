// import 'Router' class and 'User' model 
const router = require('express').Router();
const { User } = require('../../models'); // allows application to interact w/the 'users' table

// route to get all users 
router.get('/', async (req, res) => { // When a GET request is made to the root path, the following code is executed.

  try {

    const userData = await User.findAll({ // fetch user data using User.findAll() method. The attributes option is used to exclude the 'password' field from the returned user data so user passwords remain private
      attributes: {
        exclude: 'password'
      }
    });

    res.status(200).json(userData); // If the database query is successful, it responds with a status code of 200 (OK) and a JSON object containing the retrieved user data
    
  } catch (err) {
    
    res.status(500).json(err); // If an error occurs during the execution of the try block (e.g., a database error), it catches the error. It then responds with a status code of 500 (Internal Server Error) and sends the error details in the response JSON

  }

});

// Sign up route (create a new user)
router.post('/signup', async (req, res) => {

  try {
    // attempts to create a new user in db. If successful, user's ID is saved and sets 'logged_in' as true in the session and responds w/JSON object containing user data
    const userData = await User.create(req.body);
    
    // session handling
    req.session.save(() => { //sets user_id and logged_in properties in the session, indicating that the user is now logged in.
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });

  } catch (err) {
    res.status(400).json(err); // If an error occurs during the execution of the try block (e.g., validation error or database error), it catches the error. It then responds with a status code of 400 (Bad Request) and sends the error details in the response JSON. Additionally, it logs the error to the console.
  }
});

// Log in route (get a user)
router.post('/login', async (req, res) => {

 try {
  // attempts to find a user in the db w/the provided email.  if successful, it proceeds w/validation
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      // if no existing user found in db, respond w/error message
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;

    }
    // password validation
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) { // if no valid password found, respond w/a 400 (bad request) status and throw error message

      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;

    }

    // session handling
    req.session.save(() => { //sets user_id and logged_in properties in the session, indicating that the user is now logged in.
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });

    });

  } catch (err) {

    res.status(400).json(err);

  }
});

// Log out route
router.post('/logout', async (req, res) => {

  if (req.session.logged_in) { // checks if user is currently logged in.

    req.session.destroy(() => { // if logged in, use 'destroy' method to end users session.  
      res.status(204).end();
    });

  } else {

    res.status(404).end();

  }
});


module.exports = router; // export the configured router