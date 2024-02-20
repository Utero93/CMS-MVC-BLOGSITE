// Login Form Handler Asynchronous Function
const loginFormHandler = async (event) => {

    event.preventDefault(); // prevents the default behavior of form submission, allowing the function to handle the submission manually
  
    // retrieve the values entered in the email and password fields of the login form and trim any leading or trailing whitespace
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) { // ensures that both username and password have non-empty values
  
      // Send a POST request to the API endpoint
      const response = await fetch('/api/dashboard/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText); // If the response is not successful, an alert is shown with the status text
      }
    }
  };
  
  
  
  // Attaches event listener to the submit events of the login form, triggering the form handler function when the forms are submitted
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  