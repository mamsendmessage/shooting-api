var express = require("express");
var router = express.Router();
const ConfigImp = require("../implementation/configurationImplementation");
const LoggerService = require("../services/LoggerService");
const Response = require('../models/Response');

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

// router.get("/:Id", async (req, res, next) => {
//   try {
//     const tLane = await ConfigImp.Get(req.params.Id);
//     if (tLane) {
//       res.status(200).json(Response.GetSuccessResponse(tLane));
//     } else {
//       res.status(200).json(Response.GetErrorResponse(-100));
//     }
//   } catch (error) {
//     LoggerService.Log(error);
//     res.status(500).json(Response.GetGeneralError());
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     let tLane = req.body;
//     const tResult = await LaneImp.AddLane(tLane);
//     if (tResult == 0) {
//       res.status(200).json(Response.GetSuccessResponse(0));
//     } else {
//       res.status(200).json(Response.GetErrorResponse(-1));
//     }
//   } catch (error) {
//     LoggerService.Log(error);
//     res.status(500).json(Response.GetGeneralError());
//   }
// });

// router.put("/:Id", async (req, res, next) => {
//   try {
//     let tLane = req.body;
//     tLane.ID = req.params.Id;
//     const tResult = await LaneImp.UpdateLane(tLane);
//     if (tResult == 0) {
//       res.status(200).json(Response.GetSuccessResponse(0));
//     } else {
//       res.status(200).json(Response.GetErrorResponse(-1));
//     }
//   } catch (error) {
//     LoggerService.Log(error);
//     res.status(500).json(Response.GetGeneralError());
//   }
// });

// router.delete("/:Id", async (req, res, next) => {
//   try {
//     let tID = req.params.Id;
//     const tResult = await LaneImp.DeleteLane(tID);
//     if (tResult == 0) {
//       res.status(200).json(Response.GetSuccessResponse(0));
//     } else {
//       res.status(200).json(Response.GetErrorResponse(-1));
//     }
//   } catch (error) {
//     LoggerService.Log(error);
//     res.status(500).json(Response.GetGeneralError());
//   }
// });

module.exports = router;
