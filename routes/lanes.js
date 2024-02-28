var express = require("express");
var router = express.Router();
const LaneImp = require("../implementation/laneImplementation");
const TicketImp = require("../implementation/ticketImplementation")
const LoggerService = require("../services/LoggerService");
const Response = require('../models/Response');
const PlayerImplementation = require("../implementation/playerImplementation");
const ConfigurationImplementation = require("../implementation/configurationImplementation");

router.get("/", async (req, res, next) => {
  try {
    let tLanes = [];
    if (req.query && req.query.number) {
      const tLaneNumber = req.query.number;
      tLanes = await LaneImp.GetLaneByNumber(tLaneNumber);
      tLanes = tLanes && tLanes.length > 0 ? tLanes : null;
    } else if (req.query && req.query.state) {
      const tState = req.query.state;
      tLanes = await LaneImp.GetLanesByState(tState);
    } else {
      tLanes = await LaneImp.GetAllLanes();
    }
    if (tLanes) {
      res.status(200).json(Response.GetSuccessResponse(tLanes));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.get("/:Id", async (req, res, next) => {
  try {
    const tLane = await LaneImp.GetLaneByID(req.params.Id);
    if (tLane) {
      res.status(200).json(Response.GetSuccessResponse(tLane));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.post("/", async (req, res, next) => {
  try {
    let tLane = req.body;
    const tResult = await LaneImp.AddLane(tLane);
    if (tResult == 0) {
      res.status(200).json(Response.GetSuccessResponse(0));
    } else {
      res.status(200).json(Response.GetErrorResponse(-1));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.put("/:Id", async (req, res, next) => {
  try {
    let tLane = req.body;
    tLane.ID = req.params.Id;
    const tResult = await LaneImp.UpdateLane(tLane);
    if (tResult == 0) {
      res.status(200).json(Response.GetSuccessResponse(0));
    } else {
      res.status(200).json(Response.GetErrorResponse(-1));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.delete("/:Id", async (req, res, next) => {
  try {
    let tID = req.params.Id;
    const tResult = await LaneImp.DeleteLane(tID);
    if (tResult == 0) {
      res.status(200).json(Response.GetSuccessResponse(0));
    } else {
      res.status(200).json(Response.GetErrorResponse(-1));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.post("/ticket", async (req, res, next) => {
  try {
    let tTickets = [];
    if (req.query && req.query.laneId) {
      let tAllStatuses = false;
      if (req.query.allStatus && req.query.allStatus == 0) {
        tAllStatuses = true;
      }
      const tLaneId = req.query.laneId;
      tTickets = await TicketImp.GetTicketByLaneId(tLaneId, tAllStatuses);
    }
    if (tTickets) {
      res.status(200).json(Response.GetSuccessResponse(tTickets));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.post("/player/:Id", async (req, res, next) => {
  try {
    const tPlayer = await PlayerImplementation.GetPlayerByID(req.params.Id);
    if (tPlayer) {
      res.status(200).json(Response.GetSuccessResponse(tPlayer));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});


router.post("/ticket/:Id", async (req, res, next) => {
  try {
    const tTicket = await TicketImp.GetTicketByID(req.params.Id);
    if (tTicket) {
      res.status(200).json(Response.GetSuccessResponse(tTicket));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.post("/updateState", async (req, res, next) => {
  try {
    let tTicket = req.body;
    const tResult = await TicketImp.UpdateTicketState(tTicket);
    if (tResult == 0) {
      res.status(200).json(Response.GetSuccessResponse(0));
    } else {
      res.status(200).json(Response.GetErrorResponse(-1));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});


router.post("/updateLevel", async (req, res, next) => {
  try {
    let tTicket = req.body;
    const tResult = await TicketImp.UpdateTicketLevel(tTicket);
    if (tResult == 0) {
      res.status(200).json(Response.GetSuccessResponse(0));
    } else {
      res.status(200).json(Response.GetErrorResponse(-1));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.post("/nationalities", async (req, res, next) => {
  try {
    let tNationalities = [];
    tNationalities = await ConfigurationImplementation.GetAllNationalities();
    tNationalities = tNationalities && tNationalities.length > 0 ? tNationalities : null;
    if (tNationalities) {
      res.status(200).json(Response.GetSuccessResponse(tNationalities));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.post("/levels", async (req, res, next) => {
  try {
    let type = -1;
    let tLevels = [];
    if (req.query.type && req.query.type > 0) {
      type = req.query.type;
      tLevels = await ConfigurationImplementation.GetAllPlayerLevelsByGameType(type);
    } else {
      tLevels = await ConfigurationImplementation.GetAllPlayerLevels();
    }
    tLevels = tLevels && tLevels.length > 0 ? tLevels : null;
    if (tLevels) {
      res.status(200).json(Response.GetSuccessResponse(tLevels));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});


module.exports = router;
