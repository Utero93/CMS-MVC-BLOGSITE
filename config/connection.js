// import Sequelize library 
const Sequelize = require('sequelize');

// import dotenv for laoding environment variables from '.env' file into 'process.env object'
require('dotenv').config();

// declare sequelize variables to be used to store a Sequelize instance
let sequelize;
// checks for JAWSDB_URL environment variable needed for deployment with Heroku
if (process.env.JAWSDB_URL){    // if exists create new instance of Sequelize using database URL Specified
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize;