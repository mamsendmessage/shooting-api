// dbConfig.js

const config = {
  user: "sa",
  password: "sedco@123",
  server: 'localhost',
  database: "TestDB",
  options: {
    encrypt: true, // For Azure SQL Database
    trustServerCertificate: true, // For local development only
  },
};

module.exports = config;
