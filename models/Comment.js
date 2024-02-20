const { Model, DataTypes } = require('sequelize'); // import the model class and dataypes from sequelize library
const sequelize = require('../config/connection'); // imports instance of sequelize created in 'connection.js'

// Define a Comment class to interact w/the 'comments' table in the database
class Comment extends Model {}

Comment.init(
  //Attributes object
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [8], // validate user inputs some content for the comment
      },
    },
    date_posted: { // logs when comment was posted in comments table
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: { // foreign key referencing 'id' column in 'users' table
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    post_id: { // foreign key referencing 'id' column in 'posts' table
      type: DataTypes.INTEGER,
      references: {
        model: 'posts',
        key: 'id',
      },
    },
  },
  // Model options object
  {
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'comments'
  }
);

module.exports = Comment; 