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

  static async ExecuteQuery(pQuery, params = [], transaction = null) {
    try {
      const request = transaction ? new sql.Request(transaction) : DatabaseManager.pool.request();
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

  static async ExecuteNonQuery(pQuery, params = [], transaction = null) {
    try {
      const request = transaction ? new sql.Request(transaction) : DatabaseManager.pool.request();
      // Use a prepared statement to avoid SQL injection
      for (const param of params) {
        if (param.isDate) {
          request.input(param.name, sql.DateTime, param.value);
        } else {
          request.input(param.name, param.value);
        }
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

  static async BeginTransaction() {
    try {
      const transaction = new sql.Transaction(DatabaseManager.pool);
      await transaction.begin();
      return transaction;
    } catch (error) {
      LoggerService.Log(error);
      return null;
    }
  }

  static async CommitTransaction(transaction) {
    try {
      await transaction.commit();
    } catch (error) {
      LoggerService.Log(error);
    }
  }

  static async RollbackTransaction(transaction) {
    try {
      await transaction.rollback();
    } catch (error) {
      LoggerService.Log(error);
    }
  }

}

module.exports = DatabaseManager;
