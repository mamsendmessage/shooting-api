// dbConfig.js

const config = {
  user: "sa",
  password: "P@ssw0rd",
  server: 'DESKTOP-5O3CPQ4\\SQLEXPRESS',
  database: "ShootingAppDB",
  options: {
    encrypt: true, // For Azure SQL Database
    trustServerCertificate: true, // For local development only
  },
};

module.exports = config;
