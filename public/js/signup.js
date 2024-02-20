// Signup Form Handler Asynchronous Function
const signupFormHandler = async (event) => {

    event.preventDefault(); // prevents the default form submission behavior
  
    // retrieve the values entered in the username, email, and password fields of the login form and trim any leading or trailing whitespace
    const username = document.querySelector('#username-signup').value.trim();
    // const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) { // Check if name and password are provided
      const response = await fetch('/api/dashboard/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      console.log(response);
  
      if (response.ok) {
  
        document.location.replace('/dashboard'); // If successful, redirect the browser to the dashboard page
  
      } else {
  
        alert(response.statusText); // If the response is not successful, an alert is shown with the status text
  
      }
    }
  };
  
  // Attaches event listener to the submit events of the signup form, triggering the form handler function when the forms are submitted
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);