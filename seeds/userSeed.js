// This code was written w/the help of Open Ai's ChatGPT 3.5
// import the User model from the "../models" directory
const { User } = require('../models');

const users = [
  {
    username: 'john_doe',
    password: 'password1',
  },
  {
    username: 'jane_smith',
    password: 'password2',
  },
  {
    username: 'bob_jenkins',
    password: 'password3',
  },
  {
    username: 'alice_jackson',
    password: 'password4',
  },
  {
    username: 'emma_white',
    password: 'password6',
  },
];

// Define a function that inserts multiple records into the 'users' table based on the data in the 'users' array above
const seedUserData = () => User.bulkCreate(users);

module.exports = seedUserData;