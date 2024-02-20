const { Model, DataTypes } = require('sequelize'); // import the model class and dataypes from sequelize library
const sequelize = require('../config/connection'); // imports instance of sequelize created in 'connection.js'

// Define a Post class to interact w/the 'posts' table in the database
class Post extends Model {}

Post.init(
  // Attributes object
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [8, 5000], // validate user inputs some content between 8 and 5000 characters
      },
    },
    date_created: { // logs date post was created in posts table
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
  },
  // Model options object
  {
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'posts'
  }
);

module.exports = Post; 