
// editPostSubmitHandler
const createCommentSubmitHandler = async (event) => {

    event.preventDefault(); 
  
    // Get the post ID from the URL
    const post_id = parseInt(window.location.pathname.split('/').pop());
    const commentContent = document.querySelector('#comment-input').value.trim(); 
  
    console.log(post_id);
    console.log(commentContent);
  
    if (commentContent){
  
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ content: commentContent, post_id }),
        headers: {
          'Content-Type': 'application/json',
        },
        
      });
  
      console.log(response);
    
      if (response.ok) {
        alert('thanks for your comment!');
        document.location.reload();
    
      } else {
    
        alert('Failed to post comment.');
    
      }
    }
  };
  
  document
    .querySelector('.post-comment-form')
    .addEventListener('submit', createCommentSubmitHandler);