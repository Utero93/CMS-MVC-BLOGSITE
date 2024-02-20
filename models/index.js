// Import User, Post, and Comment models from their respective js files
const User = require('./User'); // import User model
const Post = require('./Post'); // import Post model
const Comment = require('./Comment'); // import Comment model

// One to many associations established
User.hasMany(Post, { // One user can have multiple posts
  foreignKey: 'user_id'
});

User.hasMany(Comment, { // One user can have multiple comments
  foreignKey: 'user_id'
}); 

Post.hasMany(Comment, { // One post can have multiple comments
  foreignKey: 'post_id'
});

// many to One associations established
Post.belongsTo(User, { // posts belong to users
  foreignKey: 'user_id'
});

Comment.belongsTo(User, { // comments belong to users
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, { // comments belong to posts
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment }; // Export models along w/their established relationships. This makes these models and their associations available for use in other parts of the application