const DatabaseManager = require("../database/databaseManager");
const Constant = require("../models/Constant");
const Permission = require("../models/Permission");
const Role = require("../models/Role");
const X_Role = require("../models/X_Role");
const Screen = require("../models/Screen");
const User = require("../models/User");
const LoggerService = require("../services/LoggerService");
const bcrypt = require('bcrypt');
const saltRounds = 10;
class Authenticationmplementation {
  static async Login(Username, Password) {
    try {
      const tUsers = [];
      const tDataSet = await DatabaseManager.ExecuteQuery(
        `SELECT * FROM [User] WHERE ([Email] = @Username OR [MobileNumber] = @Username)`,
        [
          { name: "Username", value: Username },
        ]
      );
      if (tDataSet) {
        for (let index = 0; index < tDataSet.length; index++) {
          const tUser = tDataSet[index];
          if (bcrypt.compare(Password, tUser.Password)) {
            tUsers.push(new User(tUser.ID, tUser.Name, tUser.Email, tUser.Password, tUser.MobileNumber, tUser.CreationDate, tUser.RoleId));
          }
        }
      }
      return tUsers[0];
    } catch (error) {
      LoggerService.Log(error);
    }
  }

  static async Register(pUser) {
    try {
      const tSalt = await bcrypt.genSalt(saltRounds);
      pUser.Password = await bcrypt.hash(pUser.Password, tSalt);
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

  static async GetAllPermissions(pRoleId) {
    try {
      const tPermissions = [];
      const params = [
        { name: "RoleId", value: pRoleId },
      ]
      const tDataSet = await DatabaseManager.ExecuteQuery(
        `SELECT * FROM [Permission] WHERE [RoleId] = @RoleId`,
        params
      );
      if (tDataSet) {
        for (let index = 0; index < tDataSet.length; index++) {
          const tPermission = tDataSet[index];
          tPermissions.push(new Permission(tPermission.ID, tPermission.RoleId, tPermission.ScreenId));
        }
      }
      return tPermissions;
    } catch (error) {
      LoggerService.Log(error);
    }
  }



  static async GetAllScreens() {
    try {
      const tScreens = [];
      const tDataSet = await DatabaseManager.ExecuteQuery(
        `SELECT * FROM [Screen]`,
      );
      if (tDataSet) {
        for (let index = 0; index < tDataSet.length; index++) {
          const tScreen = tDataSet[index];
          tScreens.push(new Screen(tScreen.ID, tScreen.Name));
        }
      }
      return tScreens;
    } catch (error) {
      LoggerService.Log(error);
    }
  }

  static async GetAllRoles() {
    try {
      const tRoles = [];
      const tDataSet = await DatabaseManager.ExecuteQuery(
        `SELECT * FROM [Role]`,
      );
      if (tDataSet) {
        for (let index = 0; index < tDataSet.length; index++) {
          const tRole = tDataSet[index];
          tRoles.push(new Role(tRole.ID, tRole.Name));
        }
      }
      return tRoles;
    } catch (error) {
      LoggerService.Log(error);
    }
  }


  static async GetRolesViews() {
    try {
      const tRoles = [];
      const tDataSet = await DatabaseManager.ExecuteQuery(
        `SELECT * FROM [X_Roles]`,
      );
      if (tDataSet) {
        for (let index = 0; index < tDataSet.length; index++) {
          const tData = tDataSet[index];
          tRoles.push(new X_Role(tData.RoleId, tData.Role, tData.Screens));
        }
      }
      return tRoles;
    } catch (error) {
      LoggerService.Log(error);
    }
  }


  static async GetAllUsers() {
    try {
      const tUsers = [];
      const tDataSet = await DatabaseManager.ExecuteQuery(
        `SELECT * FROM [User]`,
      );
      if (tDataSet) {
        for (let index = 0; index < tDataSet.length; index++) {
          const tUser = tDataSet[index];
          tUsers.push(new User(tUser.ID, tUser.Name, tUser.Email, tUser.Password, tUser.MobileNumber, tUser.CreationDate, tUser.RoleId));
        }
      }
      return tUsers;
    } catch (error) {
      LoggerService.Log(error);
    }
  }

  static async CreateRole(pRoleName, pScreensId) {
    try {
      let tResult;
      const transaction = await DatabaseManager.BeginTransaction();
      const tRoleParams = [
        { name: "RoleName", value: pRoleName },
      ]
      const tRoleId = await DatabaseManager.ExecuteNonQuery(
        `INSERT INTO [Role] ([Name]) OUTPUT Inserted.ID VALUES (@RoleName)`,
        tRoleParams, transaction
      );
      if (tRoleId > 0) {
        tResult = Constant.SUCCESS;
      } else {
        tResult = Constant.ERROR;
      }

      if (tResult == Constant.SUCCESS) {
        const tPermissionParams = [];
        let tQuery = 'INSERT INTO [Permission] ([RoleId],[ScreenId]) VALUES '
        for (let index = 0; index < pScreensId.length; index++) {
          const tScreenId = pScreensId[index];
          tQuery += `(${tRoleId}, ${tScreenId}), `;
        }
        tQuery = tQuery.slice(0, -2);
        tResult = await DatabaseManager.ExecuteNonQuery(tQuery, tPermissionParams, transaction);

        if (tResult == Constant.SUCCESS) {
          await DatabaseManager.CommitTransaction(transaction);
        } else {
          await DatabaseManager.RollbackTransaction(transaction);
        }

        return tResult;
      }
      return tResult;
    } catch (error) {

    }
  }


  static async DeletePermissions(pRoleId, transaction) {
    try {
      const tPermissionsParams = [
        { name: "RoleId", value: pRoleId },
      ]
      const tResult = await DatabaseManager.ExecuteNonQuery(
        `Delete From [Permission] WHERE [RoleId] = @RoleId`,
        tPermissionsParams, transaction
      );
      return tResult;
    } catch (error) {
      console.log(error);
    }
  }


  static async UpdateRole(pRoleId, pRoleName, pScreensId) {
    try {
      let tResult;
      const transaction = await DatabaseManager.BeginTransaction();
      const tRoleParams = [
        { name: "RoleName", value: pRoleName },
        { name: "RoleId", value: pRoleId },
      ]
      tResult = await DatabaseManager.ExecuteNonQuery(
        `UPDATE [Role] SET [Name] = @RoleName WHERE [ID] = @RoleId`,
        tRoleParams, transaction
      );
      if (tResult == Constant.SUCCESS) {
        tResult = await this.DeletePermissions(pRoleId, transaction);
        if (tResult == Constant.SUCCESS) {
          const tPermissionParams = [];
          let tQuery = 'INSERT INTO [Permission] ([RoleId],[ScreenId]) VALUES '
          for (let index = 0; index < pScreensId.length; index++) {
            const tScreenId = pScreensId[index];
            tQuery += `(${pRoleId}, ${tScreenId}), `;
          }
          tQuery = tQuery.slice(0, -2);
          tResult = await DatabaseManager.ExecuteNonQuery(tQuery, tPermissionParams, transaction);
        }
      }
      if (tResult == Constant.SUCCESS) {
        await DatabaseManager.CommitTransaction(transaction);
      } else {
        await DatabaseManager.RollbackTransaction(transaction);
      }
      return tResult;
    } catch (error) {

    }
  }

  static async DeleteRole(pRoleId) {
    try {
      let tResult;
      const transaction = await DatabaseManager.BeginTransaction();
      tResult = await this.DeletePermissions(pRoleId, transaction);
      if (tResult == Constant.SUCCESS) {
        const tRoleParams = [
          { name: "RoleId", value: pRoleId },
        ]
        tResult = await DatabaseManager.ExecuteNonQuery(
          `Delete From [Role] WHERE [ID] = @RoleId`,
          tRoleParams, transaction
        );
      }
      if (tResult == Constant.SUCCESS) {
        await DatabaseManager.CommitTransaction(transaction);
      } else {
        await DatabaseManager.RollbackTransaction(transaction);
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
    }
  }

  static async CreateUser(pUser) {
    try {
      try {
        const tSalt = await bcrypt.genSalt(saltRounds);
        pUser.Password = await bcrypt.hash(pUser.Password, tSalt);
        const params = [
          { name: "Name", value: pUser.Name },
          { name: "Email", value: pUser.Email },
          { name: "Password", value: pUser.Password },
          { name: "MobileNumber", value: pUser.MobileNumber },
          { name: "CreationDate", value: new Date() },
          { name: "RoleId", value: pUser.RoleId },
        ];
        const tResult = await DatabaseManager.ExecuteNonQuery(
          `INSERT INTO [User] ([Name] ,[Email],[Password],[MobileNumber],[CreationDate],[RoleId]) VALUES (@Name,@Email,@Password, @MobileNumber, @CreationDate,@RoleId)`,
          params
        );
        return tResult;
      } catch (error) {
        LoggerService.Log(error);
        return Constant.ERROR;
      }
    } catch (error) {
      LoggerService.Log(error);
    }
  }

  static async UpdateUser(pUser) {
    try {
      try {
        const params = [
          { name: "UserId", value: pUser.ID },
          { name: "Name", value: pUser.Name },
          { name: "Email", value: pUser.Email },
          { name: "MobileNumber", value: pUser.MobileNumber },
          { name: "RoleId", value: pUser.RoleId },
        ];
        let query = `UPDATE [User] SET [Name] = @Name, [Email] = @Email, [MobileNumber] = @MobileNumber, [RoleId] = @RoleId WHERE [ID] = @UserId`;
        if (pUser.Password) {
          const tSalt = await bcrypt.genSalt(saltRounds);
          const hashedPassword = await bcrypt.hash(pUser.Password, tSalt);
          params.push({ name: "Password", value: hashedPassword });
          query = `UPDATE [User] SET [Name] = @Name, [Email] = @Email, [Password] = @Password, [MobileNumber] = @MobileNumber, [RoleId] = @RoleId WHERE [ID] = @UserId`;
        }
        const tResult = await DatabaseManager.ExecuteNonQuery(query, params);
        return tResult;
      } catch (error) {
        LoggerService.Log(error);
        return Constant.ERROR;
      }
    } catch (error) {
      LoggerService.Log(error);
    }
  }


  static async SetPassword(pUser) {
    try {
      try {
        const tSalt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(pUser.Password, tSalt);
        const params = [
          { name: "UserId", value: pUser.ID },
          { name: "Password", value: hashedPassword }
        ];
        let query = `UPDATE [User] SET [Password] = @Password  WHERE [ID] = @UserId`;
        const tResult = await DatabaseManager.ExecuteNonQuery(query, params);
        return tResult;
      } catch (error) {
        LoggerService.Log(error);
        return Constant.ERROR;
      }
    } catch (error) {
      LoggerService.Log(error);
    }
  }

  static async DeleteUserById(userId) {
    try {
      const params = [{ name: "UserId", value: userId }];
      const tResult = await DatabaseManager.ExecuteNonQuery(
        `DELETE FROM [User] WHERE [ID] = @UserId`,
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
