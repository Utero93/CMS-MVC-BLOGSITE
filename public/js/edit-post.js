// edit button href handler
document.addEventListener('DOMContentLoaded', () => {
    const editButtons = document.querySelectorAll('.edit-btn');
  
    editButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const postId = event.target.dataset.id;
        window.location.href = `/edit-post/${postId}`;
      });
    });
  });
  
  
  // editPostSubmitHandler
  const editPostSubmitHandler = async (event) => {
  
    event.preventDefault(); 
  
    // Get the post ID from the URL
    const id = window.location.pathname.split('/').pop();
    const title = document.querySelector('#edit-title').value.trim();
    const content = document.querySelector('#edit-content').value.trim(); 
  
    console.log(id); 
  
    if (title && content){
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
        
      });
  
      console.log(title, content);
    
      console.log(response);
    
      if (response.ok) {
    
        document.location.replace('/dashboard');
    
      } else {
    
        alert('Failed to edit post');
    
      }
    }
  };
  
  document
    .querySelector('.edit-post-form')
    .addEventListener('submit', editPostSubmitHandler);