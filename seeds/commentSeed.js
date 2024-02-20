// This code was written w/the help of Open Ai's ChatGPT 3.5
// import the Comment model from the "../models" directory
const { Comment } = require('../models');

const comments = [
  {
    content: 'This is a great post!',
    user_id: 1,
    post_id: 1,
  },
  {
    content: 'Nice insights! Thanks for sharing.',
    user_id: 2,
    post_id: 2,
  },
  {
    content: 'Cannot wait to learn more about this!',
    user_id: 3,
    post_id: 1,
  },
  {
    content: 'Well written. Looking forward to more!',
    user_id: 4,
    post_id: 3,
  },
  {
    content: 'I completely agree with your perspective.',
    user_id: 5, 
    post_id: 2, 
  },
  {
    content: 'Interesting topic. Can you elaborate?',
    user_id: 5, 
    post_id: 3, 
  },
];

// Define a function that inserts multiple records into the 'comments' table based on the data in the 'comments' array above
const seedCommentData = () => Comment.bulkCreate(comments);

module.exports = seedCommentData;