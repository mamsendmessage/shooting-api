const DatabaseManager = require("../database/databaseManager");
const LoggerService = require("../services/LoggerService");
const Configuration = require("../models/Configuration");
const Skeet = require("../models/Skeet");
const SessionTime = require("../models/SessionTime");
const PlayerLevel = require("../models/PlayerLevel");


const Nationality = require("../models/Nationality");
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
      const params = [
        { name: "Type", value: pType },
      ];
      const tDateSet = await DatabaseManager.ExecuteQuery("SELECT * FROM [Configuration] WHERE [Type] = @Type", params);
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const tConfiguration = tDateSet[index];
          tConfigurations.push(new Configuration(tConfiguration.ID, tConfiguration.Type, tConfiguration.TimePerShot, tConfiguration.TimeToRefill, tConfiguration.Config));
        }
      }
      return tConfigurations[0];
    } catch (error) {
      LoggerService.Log(error);
      return null;
    }
  }

  static async UpdateConfigurationByID(pConfiguration) {
    try {

      const tConfiguration = new Configuration(pConfiguration.ID, pConfiguration.Type, pConfiguration.TimePerShot, pConfiguration.TimeToRefill,pConfiguration.NumberOfSkeets, pConfiguration.config)
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
          tSkeets.push(new Skeet(tSkeet.ID, tSkeet.Name));
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
          tLevels.push(new PlayerLevel(Level.ID, Level.Name));
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
