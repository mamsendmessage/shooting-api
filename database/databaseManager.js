var sql = require("mssql");
const config = require("../config/dbConfig");
const LoggerService = require("../services/LoggerService");
const Constant = require("../models/Constant");
class DatabaseManager {
  static pool;

  static async Initialize() {
    try {
      DatabaseManager.pool = await new sql.ConnectionPool(config).connect();
      return Constant.SUCCESS;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }
  static async ExecuteQuery(pQuery, params = []) {
    try {
      const request = DatabaseManager.pool.request();
      // Use a prepared statement to avoid SQL injection
      for (const param of params) {
        request.input(param.name, param.value);
      }
      const result = await request.query(pQuery);
      return result.recordset;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }



  static async ExecuteNonQuery(pQuery, params = []) {
    try {
      const request = DatabaseManager.pool.request();
      // Use a prepared statement to avoid SQL injection
      for (const param of params) {
        request.input(param.name, param.value);
      }
      const result = await request.query(pQuery);
      if (result.rowsAffected > 0) {
        if (result.recordset && result.recordset.length > 0) {
          return result.recordset[0].ID;
        }
        return Constant.SUCCESS;
      }
      return Constant.ERROR;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }

}

module.exports = DatabaseManager;
