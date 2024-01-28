const DatabaseManager = require("../database/databaseManager");
const Constant = require("../models/Constant");
const LoggerService = require("../services/LoggerService");
const Ticket = require("../models/Ticket");
const CacheService = require("../services/CacheService");
const CommonMethods = require("../models/CommonMethods");

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
          tTickets.push(new Ticket(tTicket.ID, tTicket.UserId, tTicket.LaneId, tTicket.GameTypeId, tTicket.PlayerLevelId, tTicket.SesstionTimeId, tTicket.State, tTicket.CreationDate, tTicket.LastModificationDate));
        }
      }

      return tTickets;
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

  // static async GetTicketByIDFromDB(ID) {
  //   try {
  //     const tTickets = [];
  //     const params = [{ name: "ID", value: ID }];
  //     const tDateSet = await DatabaseManager.ExecuteQuery(
  //       "SELECT * FROM [Ticket] WHERE [ID] = @ID",
  //       params
  //     );
  //     if (tDateSet) {
  //       for (let index = 0; index < tDateSet.length; index++) {
  //         const tTicket = tDateSet[index];
  //         tTickets.push(new Ticket(tTicket.ID, tTicket.UserId, tTicket.GameTypeId, tTicket.PlayerLevelId, tTicket.SesstionTimeId, tTicket.State, tTicket.CreationDate, tTicket.LastModificationDate));
  //       }
  //     }
  //     return tTickets[0];
  //   } catch (error) {
  //     LoggerService.Log(error);
  //     return undefined;
  //   }
  // }

  static GetTicketByID(ID) {
    try {
      const tTicket = CacheService.cache.tickets.find((item) => item.ID == ID);
      return tTicket;
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

  static GetTicketByLaneId(pLaneId) {
    try {
      const tTickets = CacheService.cache.tickets.filter((item) => item.LaneId == pLaneId);
      return tTickets;
    } catch (error) {
      LoggerService.Log(error);
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

  // static async GetTicketByState(pState) {
  //   try {
  //     const tTickets = [];
  //     const params = [{ name: "State", value: pState }];
  //     const tDateSet = await DatabaseManager.ExecuteQuery(
  //       "SELECT * FROM [Ticket] WHERE [State] = @State",
  //       params
  //     );
  //     if (tDateSet) {
  //       for (let index = 0; index < tDateSet.length; index++) {
  //         const tTicket = tDateSet[index];
  //         tTickets.push(new Ticket(tTicket.ID, tTicket.UserId, tTicket.GameTypeId, tTicket.PlayerLevelId, tTicket.SesstionTimeId, tTicket.State, tTicket.CreationDate, tTicket.LastModificationDate));
  //       }
  //     }
  //     return tTickets;
  //   } catch (error) {
  //     LoggerService.Log(error);
  //   }
  // }

  static GetTodayTickets() {
    try {
      const tTickets = CacheService.cache.tickets.filter((item) => CommonMethods.isToday(item.CreationDate));
      return tTickets;
    } catch (error) {
      LoggerService.Log(error);
      return undefined;
    }
  }

  static async AddTicket(ticket) {
    try {
      const tTicket = new Ticket(ticket.ID, ticket.UserId, ticket.LaneId, ticket.GameTypeId, ticket.PlayerLevelId, ticket.SesstionTimeId, ticket.State, new Date(), new Date())
      const params = [
        { name: "UserId", value: tTicket.UserId },
        { name: "LaneId", value: tTicket.LaneId },
        { name: "GameTypeId", value: tTicket.GameTypeId },
        { name: "PlayerLevelId", value: tTicket.PlayerLevelId },
        { name: "SesstionTimeId", value: tTicket.SesstionTimeId },
        { name: "State", value: tTicket.State },
        { name: "CreationDate", value: tTicket.CreationDate },
        { name: "LastModificationDate", value: tTicket.LastModificationDate },
      ];
      const tID = await DatabaseManager.ExecuteNonQuery(
        "INSERT INTO [Ticket] ([UserId],[LaneId],[GameTypeId],[PlayerLevelId],[SesstionTimeId],[State],[CreationDate],[LastModificationDate]) OUTPUT Inserted.ID VALUES " +
        "(@UserId, @LaneId,@GameTypeId, @PlayerLevelId, @SesstionTimeId, @State, @CreationDate, @LastModificationDate)",
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
      const tTicket = new Ticket(ticket.ID, ticket.UserId, ticket.LaneId, ticket.GameTypeId, ticket.PlayerLevelId, ticket.SesstionTimeId, ticket.State, ticket.CreationDate, new Date())
      const params = [
        { name: "UserId", value: tTicket.UserId },
        { name: "LaneId", value: tTicket.LaneId },
        { name: "GameTypeId", value: tTicket.GameTypeId },
        { name: "SesstionTimeId", value: tTicket.SesstionTimeId },
        { name: "State", value: tTicket.State },
        { name: "LastModificationDate", value: tTicket.LastModificationDate },
        { name: "ID", value: tTicket.ID },
      ];
      const tResult = await DatabaseManager.ExecuteNonQuery(
        "UPDATE [Ticket] SET [UserId] = @UserId, [LaneId] = @LaneId, [GameTypeId] = @GameTypeId, " +
        "[SesstionTimeId] = @SesstionTimeId, [State] = @State, [LastModificationDate] = @LastModificationDate WHERE [ID] = @ID",
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
      );W
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
