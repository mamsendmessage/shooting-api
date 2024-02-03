// dbConfig.js

const config = {
  user: "sa",
  password: "sedco@123",
  server: 'localhost',
  database: "ShootingAppDB",
  options: {
    encrypt: true, // For Azure SQL Database
    trustServerCertificate: true, // For local development only
    packetSize: 32768
  },
};

module.exports = config;
