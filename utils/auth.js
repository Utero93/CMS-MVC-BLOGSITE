// Custom middleware for making sure a user is logged in before proceeding to website functionality
const withAuth = (req, res, next) => {
  
    if (!req.session.logged_in) { // If the user is not logged in, redirect the request to the login route
      res.redirect('/login');
    } else { // if they are logged in, proceed to next middleware or function
      next();
    }
  };
  
  module.exports = withAuth; // export middleware to be used by express application