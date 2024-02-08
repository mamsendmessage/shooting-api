// dbConfig.js

const config = {
  user: "db_admin",
  password: "P@ssw0rd",
  server: 'shooting-db-server.database.windows.net',
  database: "ShootingAppDB",
  options: {
    encrypt: true, // For Azure SQL Database
    trustServerCertificate: true, // For local development only
  },
};

module.exports = config;
