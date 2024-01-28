const DatabaseManager = require("../database/databaseManager");
const Constant = require("../models/Constant");
const User = require("../models/User");
const LoggerService = require("../services/LoggerService");
class Authenticationmplementation {
  static async Login(Username, Password) {
    try {
      const tUsers = [];
      const tDateSet = await DatabaseManager.ExecuteQuery(
        `SELECT * FROM [User] WHERE [Password] =@Password And ([Email] = @Username OR [MobileNumber] = @Username)`,
        [
          { name: "Username", value: Username },
          { name: "Password", value: Password },
        ]
      );
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const tUser = tDateSet[index];
          tUsers.push(new User(tUser.ID, tUser.Name, tUser.Email, tUser.Password, tUser.MobileNumber, tUser.CreationDate));
        }
      }
      return tUsers[0];
    } catch (error) {
      LoggerService.Log(error);
    }
  }

  static async Register(pUser) {
    try {
      const params = [
        { name: "Name", value: pUser.Name },
        { name: "Email", value: pUser.Email },
        { name: "Password", value: pUser.Password },
        { name: "MobileNumber", value: pUser.MobileNumber },
        { name: "CreationDate", value: new Date() },
      ];
      const tResult = await DatabaseManager.ExecuteNonQuery(
        `INSERT INTO [User] ([Name] ,[Email],[Password],[MobileNumber],[CreationDate]) VALUES (@Name,@Email,@Password, @MobileNumber, @CreationDate)`,
        params
      );
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }
}

module.exports = Authenticationmplementation;
