const DatabaseManager = require("../database/databaseManager");
const Constant = require("../models/Constant");
const LoggerService = require("../services/LoggerService");
const Lane = require("../models/Lane");
const CacheService = require("../services/CacheService");
const Ticketmplementation = require("../implementation/ticketImplementation");
class Lanemplementation {

  static async GetAllLanesFromDB() {
    try {
      const tLanes = [];
      const tDateSet = await DatabaseManager.ExecuteQuery(
        "SELECT * FROM [Lane]"
      );
      if (tDateSet) {
        for (let index = 0; index < tDateSet.length; index++) {
          const tLane = tDateSet[index];
          tLanes.push(new Lane(tLane.ID, tLane.Name, tLane.Number, tLane.CreationDate));
        }
      }
      return tLanes;
    } catch (error) {
      LoggerService.Log(error);
      return null;
    }
  }

  static async GetAllLanes() {
    try {
      let tLanes = CacheService.cache.lanes;
      if (!tLanes || tLanes.length <= 0) {
        CacheService.cache.lanes = await this.GetAllLanesFromDB();
        tLanes = CacheService.cache.lanes;
      }
      return tLanes;
    } catch (error) {
      LoggerService.Log(error);
      return undefined;
    }
  }

  static async GetLaneByID(pID) {
    try {
      const tLane = CacheService.cache.lanes.find((item) => item.ID == pID);
      return tLane;
    } catch (error) {
      LoggerService.Log(error);
      return null;
    }
  }

  static async GetLanesByState(pSatet) {
    try {
      const tTodayTickets = await Ticketmplementation.GetTodayTickets();
      const tActiveTicket = tTodayTickets.filter((item)=>item.State == pSatet);
      const tLaneIds = tActiveTicket.map((item) => item.LaneId);      
      const tLanes = CacheService.cache.lanes.filter((item) => tLaneIds.indexOf(item.ID) !== -1);
      return tLanes;
    } catch (error) {
      LoggerService.Log(error);
      return undefined;
    }
  }

  static async GetLaneByNumber(pNumber) {
    try {
      const tLane = CacheService.cache.lanes.find((item) => item.Number == pNumber);
      return tLane;
    } catch (error) {
      LoggerService.Log(error);
    }
  }

  static async AddLane(lane) {
    try {
      const tLane = new Lane(lane.ID, lane.Name, lane.Number, new Date())
      const params = [
        { name: "Name", value: tLane.Name },
        { name: "Number", value: tLane.Number },
        { name: "CreationDate", value: tLane.CreationDate },
      ];
      const tID = await DatabaseManager.ExecuteNonQuery(
        "INSERT INTO [Lane] ([Name],[Number],[CreationDate]) OUTPUT Inserted.ID VALUES (@Name, @Number, GETDATE())",
        params
      );
      let tResult;
      if (tID > 0) {
        tResult = Constant.SUCCESS;
        tLane.ID = tID;
        CacheService.cache.lanes.push(tLane);
      } else {
        tResult = Constant.ERROR;
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }

  static async UpdateLane(lane) {
    try {
      const tLane = new Lane(lane.ID, lane.Name, lane.Number, lane.CreationDate)
      const params = [
        { name: "Name", value: tLane.Name },
        { name: "Number", value: tLane.Number },
        { name: "ID", value: tLane.ID },
      ];
      const tResult = await DatabaseManager.ExecuteNonQuery(
        "UPDATE [Lane] SET [Name] = @Name, [Number] = @Number WHERE [ID] = @ID",
        params
      );
      if (tResult == 0) {
        let tLanendex = CacheService.cache.lanes.findIndex((item) => item.ID == tLane.ID);
        CacheService.cache.lanes[tLanendex] = tLane;
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }

  static async DeleteLane(ID) {
    try {
      const params = [{ name: "ID", value: ID }];
      const tResult = await DatabaseManager.ExecuteNonQuery(
        "DELETE FROM [Lane] WHERE [ID] = @ID",
        params
      );
      if (tResult == 0) {
        CacheService.cache.lanes = CacheService.cache.lanes.filter((item) => item.ID != ID);
      }
      return tResult;
    } catch (error) {
      LoggerService.Log(error);
      return Constant.ERROR;
    }
  }
}

module.exports = Lanemplementation;
