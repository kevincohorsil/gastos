require('dotenv').config();
const mysql = require('mysql2/promise');
const app = require('./src/app');
const { sequelize } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Create database if not exists
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await connection.end();

    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();
