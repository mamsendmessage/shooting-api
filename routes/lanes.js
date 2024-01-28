var express = require("express");
var router = express.Router();
const LaneImp = require("../implementation/laneImplementation");
const LoggerService = require("../services/LoggerService");
const Response = require('../models/Response');

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

module.exports = router;
