var express = require("express");
var router = express.Router();
const ConfigImp = require("../implementation/configurationImplementation");
const LoggerService = require("../services/LoggerService");
const Response = require('../models/Response');
const CommunicationService = require("../implementation/communicationService");

router.get("/", async (req, res, next) => {
  try {
    let tConfigs = [];
    if (req.query && req.query.type) {
      const tType = req.query.type;
      tConfigs = await ConfigImp.GetAllConfigurationByType(tType);
      tConfigs = tConfigs && tConfigs.length > 0 ? tConfigs : null;
    } else {
      tConfigs = await ConfigImp.GetAllConfigurations();
    }
    if (tConfigs) {
      res.status(200).json(Response.GetSuccessResponse(tConfigs));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.post("/AddConfig", async (req, res, next) => {
  let tConfig = req.body.config;
  let tLevelName = req.body.level;
  let tImagePath = req.body.image;

  tConfig.ID = req.params.Id;
  const tResult = await ConfigImp.AddNewConfiguration(tLevelName, tImagePath, tConfig);
  if (tResult == 0) {
    res.status(200).json(Response.GetSuccessResponse(0));
  } else {
    res.status(200).json(Response.GetErrorResponse(-1));
  }
})


router.get("/skeets", async (req, res, next) => {
  try {
    let tSkeets = [];
    tSkeets = await ConfigImp.GetAllSkeets();
    tSkeets = tSkeets && tSkeets.length > 0 ? tSkeets : null;
    if (tSkeets) {
      res.status(200).json(Response.GetSuccessResponse(tSkeets));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});
router.get("/sessions-time", async (req, res, next) => {
  try {
    let tSessionsTime = [];
    tSessionsTime = await ConfigImp.GetAllSessionsTime();
    tSessionsTime = tSessionsTime && tSessionsTime.length > 0 ? tSessionsTime : null;
    if (tSessionsTime) {
      res.status(200).json(Response.GetSuccessResponse(tSessionsTime));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});


router.get("/nationalities", async (req, res, next) => {
  try {
    let tNationalities = [];
    tNationalities = await ConfigImp.GetAllNationalities();
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

router.post("/:Id", async (req, res, next) => {
  try {
    let tConfig = req.body;
    tConfig.ID = req.params.Id;
    const tResult = await ConfigImp.UpdateConfigurationByID(tConfig);
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
