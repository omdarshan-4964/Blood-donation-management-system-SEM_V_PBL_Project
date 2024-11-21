const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  logging: false, // Set to true for SQL query logs
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database connected...');
  } catch (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
