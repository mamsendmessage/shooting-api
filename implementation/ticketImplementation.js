const DatabaseManager = require("../database/databaseManager");
const Constant = require("../models/Constant");
const LoggerService = require("../services/LoggerService");
const Ticket = require("../models/Ticket");
const CacheService = require("../services/CacheService");
const X_TodayPlayer = require("../models/X_TodayPlayer");
const Player = require("../models/Player");
const CommonMethods = require("../models/CommonMethods");
const CommunicationService = require("./communicationService");

class Ticketmplementation {


  static async GetAllTicketsFromDB() {
    try {
      const tTickets = [];
      const tDateSet = await DatabaseManager.ExecuteQuery(
        "SELECT * FROM [Ticket]"
      );
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const tTicket = tDateSet[index];
          tTickets.push(new Ticket(tTicket.ID, tTicket.UserId, tTicket.LaneId, tTicket.GameTypeId, tTicket.PlayerLevelId, tTicket.SessionTimeId, tTicket.State, tTicket.TicketType, tTicket.UserType, tTicket.CreationDate, tTicket.LastModificationDate, tTicket.GamePeriod));
        }
      }

      return tTickets;
    } catch (error) {
      LoggerService.Log(error);
      return undefined;
    }
  }

  static async GetAllTimePlayers() {
    try {
      const tPlayers = [];
      const tDateSet = await DatabaseManager.ExecuteQuery(
        "SELECT * FROM X_AllTimePlayers"
      );
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const tData = tDateSet[index];
          tPlayers.push(new X_TodayPlayer(tData.UserId, tData.TicketId, tData.Photo, tData.Name, tData.GameType, tData.PlayerLevel, tData.State, tData.TicketType, tData.UserType, tData.LaneId, tData.LaneName, tData.LaneNumber, tData.CreationDate));
        }
      }
      return tPlayers;
    } catch (error) {
      LoggerService.Log(error);
      return undefined;
    }
  }

  static async GetAllTickets() {
    try {
      let tTickets = CacheService.cache.tickets;
      if (!tTickets || tTickets.length <= 0) {
        CacheService.cache.tickets = await this.GetAllTicketsFromDB();
        tTickets = CacheService.cache.tickets;
      }
      return tTickets;
    } catch (error) {
      LoggerService.Log(error);
      return undefined;
    }
  }

  static async GetTicketByID(ID) {
    try {
      const tTickets = [];
      const params = [
        { name: "ID", value: ID },
      ];
      let tDateSet = await DatabaseManager.ExecuteQuery(
        "SELECT * FROM Ticket WHERE [ID] = @ID",
        params
      );
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const tData = tDateSet[index];
          tTickets.push(new Ticket(tData.ID, tData.UserId, tData.LaneId, tData.GameTypeId, tData.PlayerLevelId, tData.SessionTimeId, tData.State, tData.TicketType, tData.UserType, tData.CreationDate, tData.LastModificationDate, tData.GamePeriod));
        }
      }
      return tTickets[0];
    } catch (error) {
      LoggerService.Log(error);
      return undefined;
    }
  }

  static GetTicketByState(pState) {
    try {
      const tTickets = CacheService.cache.tickets.filter((item) => item.State == pState);
      return tTickets;
    } catch (error) {
      LoggerService.Log(error);
    }
  }


  static async isAllLaneReadyForCompitionMode(pLanes) {
    try {
      const tTicketOnLane = [];
      let tDateSet;
      tDateSet = await DatabaseManager.ExecuteQuery(
        `SELECT * FROM X_TicketForCompetition`,
      );
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const tData = tDateSet[index];
          tTicketOnLane.push({ laneId: tData.LaneId, Count: tData.Count });
        }
      }
      for (let index = 0; index < pLanes.length; index++) {
        const tElement = pLanes[index];
        const tLane = tTicketOnLane.find((item) => item.laneId == tElement.ID && item.Count == 1);
        if (!tLane) {
          return false;
        }
      }

      return true;
    } catch (error) {
      LoggerService.Log(error);
      return undefined;
    }
  }

  static async GetTicketByLaneId(planeId, pAllStatuses) {
    try {
      const tPlayers = [];
      let tDateSet;
      const params = [
        { name: "LaneId", value: planeId },
      ];
      if (pAllStatuses) {
        tDateSet = await DatabaseManager.ExecuteQuery(
          `SELECT Top (1) X_TodayPlayers.* FROM X_TodayPlayers JOIN Ticket On Ticket.ID = X_TodayPlayers.TicketId WHERE X_TodayPlayers.[LaneId] = @LaneId Order by Ticket.LastModificationDate desc`,
          params
        );
      } else {
        tDateSet = await DatabaseManager.ExecuteQuery(
          "SELECT * FROM X_TodayPlayers WHERE [LaneId] = @LaneId and ([State] = 1 or [State] = 4 or [State] = 6)",
          params
        );
      }
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const tData = tDateSet[index];
          tPlayers.push(new X_TodayPlayer(tData.UserId, tData.TicketId, tData.Photo, tData.Name, tData.GameType, tData.PlayerLevel, tData.State, tData.TicketType, tData.UserType, tData.LaneId, tData.LaneName, tData.LaneNumber, tData.CreationDate));
        }
      }
      return tPlayers;
    } catch (error) {
      LoggerService.Log(error);
      return undefined;
    }
  }

  static GetTicketByUserId(pUserId) {
    try {
      const tTickets = CacheService.cache.tickets.filter((item) => item.UserId == pUserId);
      return tTickets;
    } catch (error) {
      LoggerService.Log(error);
    }
  }


  static async GetTodayTickets() {
    try {
      const tPlayers = [];
      const tDateSet = await DatabaseManager.ExecuteQuery(
        "SELECT * FROM X_TodayPlayers"
      );
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const tData = tDateSet[index];
          tPlayers.push(new X_TodayPlayer(tData.UserId, tData.TicketId, tData.Photo, tData.Name, tData.GameType, tData.PlayerLevel, tData.State, tData.TicketType, tData.UserType, tData.LaneId, tData.LaneName, tData.LaneNumber, tData.CreationDate));
        }
      }
      return tPlayers;
    } catch (error) {
      LoggerService.Log(error);
      return undefined;
    }
  }


  static async AddTicketForNewPlayer(data) {
    try {
      const ticket = data.ticket;
      const player = data.player;
      let tPlayer = null;
      let tResult;
      const transaction = await DatabaseManager.BeginTransaction();
      const tFoundPlayer = CacheService.cache.players.find((item) => item.MobileNumber == player.MobileNumber);
      if (tFoundPlayer) {
        tPlayer = new Player(tFoundPlayer.ID, tFoundPlayer.Name, tFoundPlayer.NationalityId, tFoundPlayer.Age, tFoundPlayer.MobileNumber, tFoundPlayer.Photo, tFoundPlayer.CreationDate, tFoundPlayer.Document,
          tFoundPlayer.PassportsNo, tFoundPlayer.MembershipNo, tFoundPlayer.MembershipExpiry);
        tResult = Constant.SUCCESS;
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
          tPlayerarams, transaction
        );
        if (tPlayerID > 0) {
          tResult = Constant.SUCCESS;
          tPlayer.ID = tPlayerID;
          CacheService.cache.players.push(tPlayer);
        } else {
          tResult = Constant.ERROR;
        }
      }
      if (tResult != Constant.SUCCESS) {
        await DatabaseManager.RollbackTransaction(transaction);
        return;
      }

      //check numbers of waiting tickits 
      const AllTickets = await this.GetAllTickets();
      const WatingTickets = AllTickets.filter((item) => (item.State == 0) && item.LaneId == ticket.LaneId);
      const tTicket = new Ticket(ticket.ID, ticket.UserId, ticket.LaneId, ticket.GameTypeId, ticket.PlayerLevelId, ticket.SessionTimeId, ticket.State, ticket.TicketType, ticket.UserType, new Date(), new Date(), ticket.GamePeriod)
      if (WatingTickets.length > 0) {
        tTicket.State = 2;
      } else {
        tTicket.State = 0;
      }
      tTicket.UserId = tPlayer.ID;
      const tPlayerTickets = AllTickets.filter((item) => item.UserId == tTicket.UserId);
      tTicket.UserType = tPlayerTickets && tPlayerTickets.length > 0 ? 2 : 1;
      tTicket.TicketType = 1;
      const params = [
        { name: "UserId", value: tTicket.UserId },
        { name: "LaneId", value: tTicket.LaneId },
        { name: "GameTypeId", value: tTicket.GameTypeId ? tTicket.GameTypeId : 'null' },
        { name: "PlayerLevelId", value: tTicket.PlayerLevelId },
        { name: "SessionTimeId", value: tTicket.SessionTimeId },
        { name: "State", value: tTicket.State },
        { name: "TicketType", value: tTicket.TicketType },
        { name: "UserType", value: tTicket.UserType },
        { name: "CreationDate", value: tTicket.CreationDate },
        { name: "LastModificationDate", value: tTicket.LastModificationDate },
      ];

      const tTicketID = await DatabaseManager.ExecuteNonQuery(
        "INSERT INTO [Ticket] ([UserId],[LaneId],[GameTypeId],[PlayerLevelId],[SessionTimeId],[State],[UserType],[TicketType],[CreationDate],[LastModificationDate]) OUTPUT Inserted.ID VALUES " +
        "(@UserId, @LaneId,@GameTypeId, @PlayerLevelId, @SessionTimeId, @State,@UserType, @TicketType, @CreationDate, @LastModificationDate)",
        params, transaction
      );
      if (tTicketID > 0) {
        tResult = Constant.SUCCESS;
        tTicket.ID = tTicketID;
        CacheService.cache.tickets.push(tTicket);
      } else {
        tResult = Constant.ERROR;
      }
      if (tResult == Constant.SUCCESS) {
        await DatabaseManager.CommitTransaction(transaction);
      } else {
        CacheService.cache.players = CacheService.cache.players.filter((item) => item.ID != tPlayer.ID)
        CacheService.cache.tickets = CacheService.cache.tickets.filter((item) => item.ID != tTicketID)
        await DatabaseManager.RollbackTransaction(transaction);
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }


  static async AddTicket(ticket) {
    try {

      //check numbers of waiting tickits 
      const AllTickets = await this.GetAllTickets();
      const WatingTickets = AllTickets.filter((item) => (item.State == 0) && item.LaneId == ticket.LaneId);
      const tTicket = new Ticket(ticket.ID, ticket.UserId, ticket.LaneId, ticket.GameTypeId, ticket.PlayerLevelId, ticket.SessionTimeId, ticket.State, ticket.TicketType, ticket.UserType, new Date(), new Date(), ticket.GamePeriod)
      if (WatingTickets.length > 0) {
        tTicket.State = 2;
      } else {
        tTicket.State = 0;
      }
      const tPlayerTickets = AllTickets.filter((item) => item.UserId == ticket.UserId);
      tTicket.UserType = tPlayerTickets && tPlayerTickets.length > 0 ? 2 : 1;
      tTicket.TicketType = 1;
      const params = [
        { name: "UserId", value: tTicket.UserId },
        { name: "LaneId", value: tTicket.LaneId },
        { name: "GameTypeId", value: tTicket.GameTypeId ? tTicket.GameTypeId : 'null' },
        { name: "PlayerLevelId", value: tTicket.PlayerLevelId },
        { name: "SessionTimeId", value: tTicket.SessionTimeId },
        { name: "State", value: tTicket.State },
        { name: "TicketType", value: tTicket.TicketType },
        { name: "UserType", value: tTicket.UserType },
        { name: "CreationDate", value: tTicket.CreationDate },
        { name: "LastModificationDate", value: tTicket.LastModificationDate },
      ];
      const tID = await DatabaseManager.ExecuteNonQuery(
        "INSERT INTO [Ticket] ([UserId],[LaneId],[GameTypeId],[PlayerLevelId],[SessionTimeId],[State],[UserType],[TicketType],[CreationDate],[LastModificationDate]) OUTPUT Inserted.ID VALUES " +
        "(@UserId, @LaneId,@GameTypeId, @PlayerLevelId, @SessionTimeId, @State,@UserType, @TicketType, @CreationDate, @LastModificationDate)",
        params
      );
      let tResult;
      if (tID > 0) {
        tResult = Constant.SUCCESS;
        tTicket.ID = tID;
        CacheService.cache.tickets.push(tTicket);
      } else {
        tResult = Constant.ERROR;
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }

  static async UpdateTicket(ticket) {
    try {
      const tTicket = new Ticket(ticket.ID, ticket.UserId, ticket.LaneId, ticket.GameTypeId, ticket.PlayerLevelId, ticket.SessionTimeId, ticket.State, ticket.TicketType, ticket.UserType, ticket.CreationDate, new Date(), ticket.GamePeriod)
      const params = [
        { name: "UserId", value: tTicket.UserId },
        { name: "LaneId", value: tTicket.LaneId },
        { name: "GameTypeId", value: tTicket.GameTypeId },
        { name: "SessionTimeId", value: tTicket.SessionTimeId },
        { name: "State", value: tTicket.State },
        { name: "LastModificationDate", value: tTicket.LastModificationDate },
        { name: "TicketType", value: tTicket.TicketType },
        { name: "UserType", value: tTicket.UserType },
        { name: "ID", value: tTicket.ID },
      ];
      const tResult = await DatabaseManager.ExecuteNonQuery(
        "UPDATE [Ticket] SET [UserId] = @UserId, [LaneId] = @LaneId, [GameTypeId] = @GameTypeId, " +
        "[SessionTimeId] = @SessionTimeId, [State] = @State,[UserType] = @UserType, [TicketType] = @TicketType, [LastModificationDate] = @LastModificationDate WHERE [ID] = @ID",
        params
      );
      if (tResult == 0) {
        let tTicketIndex = CacheService.cache.tickets.findIndex((item) => item.ID == tTicket.ID);
        CacheService.cache.tickets[tTicketIndex] = tTicket;
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }


  static async FinishTicket(pTicketId) {
    try {
      const tNow = new Date();
      const params = [
        { name: "State", value: 3 },
        { name: "ID", value: pTicketId },
        { name: "LastModificationDate", value: tNow },
      ];
      const tResult = await DatabaseManager.ExecuteNonQuery(
        "UPDATE [Ticket] SET [State] = @State WHERE [ID] = @ID",
        params
      );
      if (tResult == 0) {
        let tTicketIndex = CacheService.cache.tickets.findIndex((item) => item.ID == pTicketId);
        CacheService.cache.tickets[tTicketIndex].State = 3;
        CacheService.cache.tickets[tTicketIndex].LastModificationDate = tNow;
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }

  static async UpdateTicketState(ticket, pLanes = []) {
    try {
      let tInGameTickets;
      let tResult;
      if (ticket.PlayerLevelId != null) {
        tInGameTickets = await this.GetTicketByState(1);
        if (ticket.State == 1 && tInGameTickets.length > 0) {
          tResult = -4;
          return tResult;
        }
      }
      const tTicketBefore = await this.GetTicketByID(ticket.ID);
      let tGamePeriod = await CommunicationService.getTotalGameTime(tTicketBefore.PlayerLevelId);
      if (ticket.State == 6 || tTicketBefore.State == 6) {
        tGamePeriod = await CommunicationService.getRemainingGameTime(tTicketBefore.PlayerLevelId, tTicketBefore.LaneId);
      }
      const tTicket = new Ticket(ticket.ID, ticket.UserId, ticket.LaneId, ticket.GameTypeId, ticket.PlayerLevelId, ticket.SessionTimeId, ticket.State, ticket.TicketType, ticket.UserType, ticket.CreationDate, ticket.LastModificationDate, ticket.GamePeriod)
      const params = [
        { name: "State", value: tTicket.State },
        { name: "ID", value: tTicket.ID },
        { name: "LastModificationDate", value: new Date() },
        { name: "GamePeriod", value: tGamePeriod }
      ];
      tResult = await DatabaseManager.ExecuteNonQuery(
        "UPDATE [Ticket] SET [State] = @State,[LastModificationDate]= @LastModificationDate, [GamePeriod] = @GamePeriod WHERE [ID] = @ID",
        params
      );

      if (tResult == 0) {
        let tTicketIndex = CacheService.cache.tickets.findIndex((item) => item.ID == tTicket.ID);
        CacheService.cache.tickets[tTicketIndex] = tTicket;
        if (tTicket.State == 1) {
          if (tTicketBefore.State == 6) {
            CommunicationService.ResumeLaneQueue(ticket.LaneId)
          } else {
            const tPlayerLevelId = tTicket.PlayerLevelId;
            if (ticket.PlayerLevelId != null) {
              CommunicationService.startGame(ticket.LaneId, tPlayerLevelId, ticket.ID, tGamePeriod);
            } else {
              if (await this.isAllLaneReadyForCompitionMode(pLanes)) {
                await CommunicationService.startCompetitionGame();
              }
            }
          }
        } else if (tTicket.State == 3) {
          CommunicationService.DeleteLaneQueue(ticket.LaneId);
          CommunicationService.forceFinish(ticket.LaneId)

        } else if (tTicket.State == 6) {
          CommunicationService.PauseLaneQueue(ticket.LaneId);
        }
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }

  static async UpdateTicketLevel(ticket) {
    try {
      const tTicket = new Ticket(ticket.ID, ticket.UserId, ticket.LaneId, ticket.GameTypeId, ticket.PlayerLevelId, ticket.SessionTimeId, ticket.State, ticket.TicketType, ticket.UserType, ticket.CreationDate, new Date(), ticket.GamePeriod)
      const params = [
        { name: "PlayerLevelId", value: tTicket.PlayerLevelId },
        { name: "ID", value: tTicket.ID },
        { name: "LastModificationDate", value: tTicket.LastModificationDate },
      ];
      const tResult = await DatabaseManager.ExecuteNonQuery(
        "UPDATE [Ticket] SET [PlayerLevelId] = @PlayerLevelId WHERE [ID] = @ID",
        params
      );
      if (tResult == 0) {
        let tTicketIndex = CacheService.cache.tickets.findIndex((item) => item.ID == tTicket.ID);
        CacheService.cache.tickets[tTicketIndex] = tTicket;
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }

  static async DeleteTicket(ID) {
    try {
      const params = [{ name: "ID", value: ID }];
      const tResult = await DatabaseManager.ExecuteNonQuery(
        "DELETE FROM [Ticket] WHERE [ID] = @ID",
        params
      ); W
      if (tResult == 0) {
        CacheService.cache.tickets = CacheService.cache.tickets.filter((item) => item.ID != ID);
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }
}

module.exports = Ticketmplementation;
