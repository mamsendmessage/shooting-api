var express = require("express");
var router = express.Router();
const PlayerImp = require("../implementation/playerImplementation");
const LoggerService = require("../services/LoggerService");
const Response = require("../models/Response");

router.get("/", async (req, res, next) => {
  try {
    let tPlayers = [];
    if (req.query && req.query.isToday) {
      const tIsToday = req.query.isToday;
      if (tIsToday == 1) {
        tPlayers = await PlayerImp.GetTodayPlayers();
      }
    } else if (req.query && req.query.mobileNumber) {
      const tMobileNumber = req.query.mobileNumber;
      tPlayers = await PlayerImp.GetPlayerByMobileNumber(tMobileNumber);
      tPlayers = tPlayers && tPlayers.length > 0 ? tPlayers : null;
    } else {
      tPlayers = await PlayerImp.GetAllPlayers();
    }
    if (tPlayers) {
      res.status(200).json(Response.GetSuccessResponse(tPlayers));
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
    const tPlayer = await PlayerImp.GetPlayerByID(req.params.Id);
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

router.post("/", async (req, res, next) => {
  try {
    let tPlayer = req.body;
    const tResult = await PlayerImp.AddPlayer(tPlayer);
    if (tResult == 0) {
      res.status(200).json(Response.GetSuccessResponse(0));
    } else {
      res.status(200).json(Response.GetErrorResponse(tResult));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.post("/:Id", async (req, res, next) => {
  try {
    let tPlayer = req.body.player;
    let tIsNewPhoto = req.body.isNewPhoto;
    let tIsNewDocument = req.body.isNewDocument;
      tPlayer.ID = req.params.Id;
    const tResult = await PlayerImp.UpdatePlayer(tPlayer, tIsNewPhoto, tIsNewDocument);
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
    const tResult = await PlayerImp.DeletePlayer(tID);
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