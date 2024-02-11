var express = require("express");
var router = express.Router();
const TicketImp = require("../implementation/ticketImplementation");
const Response = require('../models/Response');

router.get("/", async (req, res, next) => {
  try {
    let tTickets = [];
    if (req.query && req.query.state) {
      const tState = req.query.state;
      tTickets = TicketImp.GetTicketByState(tState);
      tTickets = tTickets && tTickets.length > 0 ? tTickets : null;
    } else if (req.query && req.query.isToday) {
      if (req.query.isToday == 1) {
        tTickets = TicketImp.GetTodayTickets();
      }
    } else if (req.query && req.query.laneId) {
      const tLaneId = req.query.laneId;
      tTickets = await TicketImp.GetTicketByLaneId(tLaneId);
    } else if (req.query && req.query.userId) {
      const tUserId = req.query.userId;
      tTickets = TicketImp.GetTicketByUserId(tUserId);
    } else if (req.query && req.query.alltime) {
      if (req.query.alltime == 1) {
        tTickets = await TicketImp.GetAllTimePlayers();
      }
    } else {
      tTickets = await TicketImp.GetAllTickets();
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

router.get("/:Id", async (req, res, next) => {
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

router.post("/", async (req, res, next) => {
  try {
    let tTicket = req.body;
    const tResult = await TicketImp.AddTicket(tTicket);
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

router.post("/newPlayer", async (req, res, next) => {
  try {
    let tData = req.body;
    const tResult = await TicketImp.AddTicketForNewPlayer(tData);
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



router.delete("/:Id", async (req, res, next) => {
  try {
    let tID = req.params.Id;
    const tResult = await TicketImp.DeleteTicket(tID);
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

module.exports = router;
