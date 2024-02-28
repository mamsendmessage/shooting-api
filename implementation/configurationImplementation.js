const DatabaseManager = require("../database/databaseManager");
const LoggerService = require("../services/LoggerService");
const Configuration = require("../models/Configuration");
const Skeet = require("../models/Skeet");
const SessionTime = require("../models/SessionTime");
const PlayerLevel = require("../models/PlayerLevel");


const Nationality = require("../models/Nationality");
const Constant = require("../models/Constant");
class ConfigurationImplementation {

  static async GetAllConfigurations() {
    try {
      const tConfigurations = [];
      const tDateSet = await DatabaseManager.ExecuteQuery(
        "SELECT * FROM [Configuration]"
      );
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const tConfiguration = tDateSet[index];
          tConfigurations.push(new Configuration(tConfiguration.ID, tConfiguration.Type, tConfiguration.TimePerShot, tConfiguration.TimeToRefill, tConfiguration.NumberOfSkeets, tConfiguration.Config));
        }
      }
      return tConfigurations;
    } catch (error) {
      LoggerService.Log(error);
      return null;
    }
  }

  static async GetAllConfigurationByType(pType) {
    try {
      const tConfigurations = [];
      let tWhereCluase = '';
      const params = [

      ];
      if (pType) {
        params.push({ name: "Type", value: pType });
        tWhereCluase += 'WHERE [Type] = @Type'
      } else {
        tWhereCluase += 'WHERE [Type] is null'

      }

      const tDateSet = await DatabaseManager.ExecuteQuery("SELECT * FROM [Configuration] " + tWhereCluase, params);
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const tConfiguration = tDateSet[index];
          tConfigurations.push(new Configuration(tConfiguration.ID, tConfiguration.Type, tConfiguration.TimePerShot, tConfiguration.TimeToRefill, tConfiguration.NumberOfSkeets, tConfiguration.Config));
        }
      }
      return tConfigurations[0];
    } catch (error) {
      LoggerService.Log(error);
      return null;
    }
  }

  static async AddNewConfiguration(pLevelName, pImagePath, pGameTypeId, pConfiguration) {
    try {

      let tResult;
      const transaction = await DatabaseManager.BeginTransaction();
      const tLevelQuery = `INSERT INTO [PlayerLevel] ([Name],[GameTypeId],[Image])  OUTPUT Inserted.ID Values (@Name,@GameTypeId,@Image)`;
      const tLevelParams = [
        { name: "Name", value: pLevelName },
        { name: "Image", value: pImagePath },
        { name: "GameTypeId", value: pGameTypeId }
      ];
      const tPlayerLevelId = await DatabaseManager.ExecuteNonQuery(tLevelQuery, tLevelParams, transaction)

      if (tPlayerLevelId > 0) {
        const tConfiguration = new Configuration(pConfiguration.ID, pConfiguration.Type, pConfiguration.TimePerShot, pConfiguration.TimeToRefill, pConfiguration.NumberOfSkeet, pConfiguration.config)
        const params = [
          { name: "TimePerShot", value: tConfiguration.TimePerShot },
          { name: "TimeToRefill", value: tConfiguration.TimeToRefill },
          { name: "NumberOfSkeets", value: tConfiguration.NumberOfSkeet },
          { name: "Type", value: tPlayerLevelId },
          { name: "Config", value: tConfiguration.Config },
        ];
        const tConfigQuery = `INSERT INTO [dbo].[Configuration]([Type],[TimePerShot],[TimeToRefill],[NumberOfSkeets],[Config]) VALUES (@Type,@TimePerShot,@TimeToRefill,@NumberOfSkeets,@Config)`;
        tResult = await DatabaseManager.ExecuteNonQuery(
          tConfigQuery,
          params,
          transaction
        );
        if (tResult == Constant.SUCCESS) {
          await DatabaseManager.CommitTransaction(transaction);
        } else {
          await DatabaseManager.RollbackTransaction(transaction);
        }
      } else {
        await DatabaseManager.RollbackTransaction(transaction);
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return null;
    }
  }

  static async DeleteConfiguration(pId, pLevelId) {
    try {
      const transaction = await DatabaseManager.BeginTransaction();
      const params = [{ name: "ID", value: pId }];
      let tResult = await DatabaseManager.ExecuteNonQuery(
        `DELETE FROM [Configuration] WHERE [ID] = @ID`,
        params,
        transaction
      );
      if (tResult == 0) {
        const tLevelParams = [{ name: "ID", value: pLevelId }];
        tResult = await DatabaseManager.ExecuteNonQuery(
          `DELETE FROM [PlayerLevel] WHERE [ID] = @ID`,
          tLevelParams,
          transaction
        );
      } else {
        await DatabaseManager.RollbackTransaction(transaction);
      }
      if (tResult == 0) {
        await DatabaseManager.CommitTransaction(transaction);
      } else {
        await DatabaseManager.RollbackTransaction(transaction);
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }


  static async UpdateConfigurationByID(pConfiguration) {
    try {

      const tConfiguration = new Configuration(pConfiguration.ID, pConfiguration.Type, pConfiguration.TimePerShot, pConfiguration.TimeToRefill, pConfiguration.NumberOfSkeets, pConfiguration.config)
      const params = [
        { name: "TimePerShot", value: tConfiguration.TimePerShot },
        { name: "TimeToRefill", value: tConfiguration.TimeToRefill },
        { name: "Config", value: tConfiguration.Config },
        { name: "ID", value: tConfiguration.ID },
      ];

      const tResult = await DatabaseManager.ExecuteNonQuery(
        `UPDATE [Configuration] SET [TimePerShot] = @TimePerShot, [TimeToRefill] = @TimeToRefill , [Config] = @Config WHERE [ID] = @ID`,
        params
      );
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return null;
    }
  }

  static async GetAllSkeets() {
    try {
      const tSkeets = [];
      const tDateSet = await DatabaseManager.ExecuteQuery(
        "SELECT * FROM [Skeet] Order By [ID]"
      );
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const tSkeet = tDateSet[index];
          tSkeets.push(new Skeet(tSkeet.ID, tSkeet.Name, tSkeet.API));
        }
      }
      return tSkeets;
    } catch (error) {
      LoggerService.Log(error);
      return null;
    }
  }

  static async GetAllNationalities() {
    try {
      const Nationalities = [];
      const tDateSet = await DatabaseManager.ExecuteQuery(
        "SELECT * FROM [Nationality]"
      );
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const tNationality = tDateSet[index];
          Nationalities.push(new Nationality(tNationality.NumCode, tNationality.NationalityName));
        }
      }
      return Nationalities;
    } catch (error) {
      LoggerService.Log(error);
      return null;
    }
  }
  static async GetAllSessionsTime() {
    try {
      const tSessionsTime = [];
      const tDateSet = await DatabaseManager.ExecuteQuery(
        "SELECT * FROM [SessionTime] Order By [ID]"
      );
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const Session = tDateSet[index];
          tSessionsTime.push(new SessionTime(Session.ID, Session.Name));
        }
      }
      return tSessionsTime;
    } catch (error) {
      LoggerService.Log(error);
      return null;
    }
  }
  static async GetAllPlayerLevels() {
    try {
      const tLevels = [];
      const tDateSet = await DatabaseManager.ExecuteQuery(
        "SELECT * FROM [PlayerLevel] Order By [ID]"
      );
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const Level = tDateSet[index];
          tLevels.push(new PlayerLevel(Level.ID, Level.Name, Level.GameTypeId, Level.Image));
        }
      }
      return tLevels;
    } catch (error) {
      LoggerService.Log(error);
      return null;
    }
  }

  static async GetAllPlayerLevelsByGameType(pGameTypeId) {
    try {
      const tLevels = [];
      const params = [
        { name: "GameTypeId", value: pGameTypeId },
      ];
      const tDateSet = await DatabaseManager.ExecuteQuery(
        "SELECT * FROM [PlayerLevel] WHERE [GameTypeId] = @GameTypeId Order By [ID]", params
      );
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const Level = tDateSet[index];
          tLevels.push(new PlayerLevel(Level.ID, Level.Name, Level.GameTypeId, Level.Image));
        }
      }
      return tLevels;
    } catch (error) {
      LoggerService.Log(error);
      return null;
    }
  }
}

module.exports = ConfigurationImplementation;
