// import seed data
const seedUserData = require('./userSeed');
const seedPostData = require('./postSeed');
const seedCommentData = require('./commentSeed');

const sequelize = require('../config/connection');

const seedDatabase = async () => {

  await sequelize.sync({ force: true });

  await seedUserData();
  await seedPostData();
  await seedCommentData();

  process.exit(0);

};

seedDatabase(); 