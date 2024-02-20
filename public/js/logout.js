// Login Form Handler Asynchronous Function
const logout = async () => { 

    // Use the fetch function to send a POST request to the '/api/users/logout' endpoint
    const response = await fetch('/api/dashboard/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) { // If the response is successful (status code 200-299), the browser is redirected to the '/' (home) page
      document.location.replace('/');
  
    } else {
  
      alert(response.statusText); // If the response is not successful, an alert is shown with the status text
  
    }
  };
  
  // Attach an event listener to the 'click' event of this 'logout' ID element, triggering the logout function when the element is clicked
  document
    .querySelector('#logout')
    .addEventListener('click', logout);