const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const options = {
  host : `${process.env.DB_HOST}`,
  logging : false,
  dialect : "postgres",
  port : `${process.env.DB_PORT}`
}

const sequelize = new Sequelize(`${process.env.DB_NAME}`,`${process.env.DB_USERNAME}`,`${process.env.DB_PASSWORD}`,options)

async function connectDB() {
  await sequelize.sync()

try {
  await sequelize.authenticate();
  console.log('Connection has been database established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}

module.exports = {connectDB}