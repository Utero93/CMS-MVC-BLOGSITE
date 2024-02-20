const { Model, DataTypes } = require('sequelize'); // import the model class and dataypes from sequelize library 
const bcrypt = require('bcrypt'); // for hashing passwords
const sequelize = require('../config/connection'); // imports instance of sequelize created in 'connection.js'

// Define a User class to interact w/the 'users' table in the database
class User extends Model {
  // method added to 'user' class. it takes a loginPw and compares it w/ the hashed password stored in the db for the current user.  returns 'true' if the passwords match, and 'false' otherwise
  checkPassword(loginPw){ 
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  // Attributes object
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Username must be unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // validates user entered a password w/at least 8 characters
      },
    },
  },
  // Model options object
  {
    hooks: { // beforeCreate and beforeUpdate hooks that hash the user's password using bcrypt before storing it in the database
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10); 
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: 'users'
  }
);

module.exports = User;