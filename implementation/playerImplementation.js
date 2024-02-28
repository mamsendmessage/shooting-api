const DatabaseManager = require("../database/databaseManager");
const CommonMethods = require("../models/CommonMethods");
const { isToday } = require("../models/CommonMethods");
const Constant = require("../models/Constant");
const Player = require("../models/Player");
const CacheService = require("../services/CacheService");
const LoggerService = require("../services/LoggerService");
const Ticketmplementation = require("./ticketImplementation");

class PlayerImplementation {

  static async GetAllPlayersFromDB() {
    try {
      const tPlayers = [];
      const tDateSet = await DatabaseManager.ExecuteQuery(
        "SELECT * FROM [Player]"
      );
      for (let index = 0; index < tDateSet.length; index++) {
        const tPlayer = tDateSet[index];
        tPlayers.push(new Player(tPlayer.ID, tPlayer.Name, tPlayer.NationalityId, tPlayer.Age, tPlayer.MobileNumber, tPlayer.Photo, tPlayer.CreationDate,tPlayer.Document,
          tPlayer.PassportsNo, tPlayer.MembershipNo, tPlayer.MembershipExpiry));
      }
      return tPlayers;
    } catch (error) {
      LoggerService.Log(error);
      return undefined;
    }
  }

  static async GetAllPlayers() {
    try {
      let tPlayes = CacheService.cache.players;
      if (!tPlayes || tPlayes.length <= 0) {
        CacheService.cache.players = await this.GetAllPlayersFromDB();
        tPlayes = CacheService.cache.players;
      }
      return tPlayes;
    } catch (error) {
      LoggerService.Log(error);
      return undefined;
    }
  }

  static async GetPlayerByID(pID) {
    try {
      const tPlayer = CacheService.cache.players.find((item) => item.ID == pID);
      return tPlayer;

    } catch (error) {
      LoggerService.Log(error);
      return undefined;
    }
  }

  static async GetPlayerByMobileNumber(pMobileNumber) {
    try {
      const tPlayers = CacheService.cache.players.filter((item) => item.MobileNumber == pMobileNumber);
      return tPlayers;
    } catch (error) {
      LoggerService.Log(error);
      return undefined;
    }
  }

  static async GetTodayPlayers() {
    try {
      const tTodaytPlayers = await Ticketmplementation.GetTodayTickets();
      return tTodaytPlayers;
    } catch (error) {
      LoggerService.Log(error);
      return undefined;
    }
  }

  static async AddPlayer(player) {
    try {
      let tResult;
      let tPlayer = null;
      const tFoundPlayer = CacheService.cache.players.find((item) => item.MobileNumber == player.MobileNumber);
      if (tFoundPlayer) {
        tPlayer = new Player(tFoundPlayer.ID, tFoundPlayer.Name, tFoundPlayer.NationalityId, tFoundPlayer.Age, tFoundPlayer.MobileNumber, tFoundPlayer.Photo, tFoundPlayer.CreationDate, tFoundPlayer.Document,
          tFoundPlayer.PassportsNo, tFoundPlayer.MembershipNo, tFoundPlayer.MembershipExpiry);
        tResult = Constant.AlreadyExist;
      } else {
        player.Photo = CommonMethods.SavePlayerImage(player.Photo);
        player.Document = CommonMethods.SavePlayerDocument(player.Document);
        tPlayer = new Player(player.ID, player.Name, player.NationalityId, player.Age, player.MobileNumber, player.Photo, new Date(), player.Document,
          player.PassportsNo, player.MembershipNo, player.MembershipExpiry);
        const tPlayerarams = [
          { name: "Name", value: tPlayer.Name },
          { name: "NationalityId", value: tPlayer.NationalityId },
          { name: "Age", value: tPlayer.Age },
          { name: "MobileNumber", value: tPlayer.MobileNumber },
          { name: "Photo", value: tPlayer.Photo },
          { name: "Document", value: tPlayer.Document },
          { name: "CreationDate", value: tPlayer.CreationDate, isDate: true },
          { name: "PassportsNo", value: tPlayer.PassportsNo },
          { name: "MembershipNo", value: tPlayer.MembershipNo },
          { name: "MembershipExpiry", value: new Date(tPlayer.MembershipExpiry), isDate: true },
        ];
        const tPlayerID = await DatabaseManager.ExecuteNonQuery(
          `INSERT INTO [Player] ([Name],[NationalityId],[Age],[MobileNumber],[Photo],[Document],[CreationDate],[PassportsNo],[MembershipNo],[MembershipExpiry]) OUTPUT Inserted.ID VALUES
          (@Name, @NationalityId, @Age, @MobileNumber, @Photo,@Document, @CreationDate, @PassportsNo,@MembershipNo, @MembershipExpiry)`,
          tPlayerarams
        );
        if (tPlayerID > 0) {
          tResult = Constant.SUCCESS;
          tPlayer.ID = tPlayerID;
          CacheService.cache.players.push(tPlayer);
        } else {
          tResult = Constant.ERROR;
        }
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }

  static async UpdatePlayer(player) {
    try {
      const tPlayer = new Player(player.ID, player.Name, player.NationalityId, player.Age, player.MobileNumber, player.Photo, player.CreationDate);
      const params = [
        { name: "Name", value: tPlayer.Name },
        { name: "NationalityId", value: tPlayer.NationalityId },
        { name: "Age", value: tPlayer.Age },
        { name: "MobileNumber", value: tPlayer.MobileNumber },
        { name: "Photo", value: tPlayer.Photo },
        { name: "ID", value: tPlayer.ID },
        { name: "PassportsNo", value: tPlayer.PassportsNo },
        { name: "MembershipNo", value: tPlayer.MembershipNo },
        { name: "MembershipExpiry", value: new Date(tPlayer.MembershipExpiry), isDate: true },
      ];

      const tResult = await DatabaseManager.ExecuteNonQuery(
        `UPDATE [Player] SET [Name] = @Name, [NationalityId] = @NationalityId,
        [Age] = @Age, [MobileNumber] = @MobileNumber, [Photo] = @Photo,[PassportsNo]=@PassportsNo,[MembershipNo]=@MembershipNo,[MembershipExpiry]=@MembershipExpiry  WHERE [ID] = @ID`,
        params
      );
      if (tResult == 0) {
        let tPlayerIndex = CacheService.cache.players.findIndex((item) => item.ID == tPlayer.ID);
        CacheService.cache.players[tPlayerIndex] = tPlayer;
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }

  static async DeletePlayer(id) {
    try {
      const params = [{ name: "ID", value: id }];
      const tResult = await DatabaseManager.ExecuteNonQuery(
        "DELETE FROM [Player] WHERE [ID] = @ID",
        params
      );
      if (tResult == 0) {
        CacheService.cache.players = CacheService.cache.players.filter((item) => item.ID != ID);
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }
}

module.exports = PlayerImplementation;
