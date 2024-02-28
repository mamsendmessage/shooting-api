var express = require("express");
var router = express.Router();
const AuthImp = require("../implementation/authenticationImplementation");
const LoggerService = require("../services/LoggerService");
const Response = require('../models/Response');

router.get("/", async (req, res, next) => {
  try {
    const tUsers = await AuthImp.GetAllUsers();
    if (tUsers) {
      for (let index = 0; index < tUsers.length; index++) {
        const element = tUsers[index];
        element.Password = undefined;
      }
      res.status(200).json(Response.GetSuccessResponse(tUsers));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100, "There Is No User Found"));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.get("/screens", async (req, res, next) => {
  try {
    const tScreens = await AuthImp.GetAllScreens();
    if (tScreens) {
      res.status(200).json(Response.GetSuccessResponse(tScreens));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100, "There Is No Screen Found"));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.get("/permissions/:Id", async (req, res, next) => {
  try {
    const tPermissions = await AuthImp.GetAllPermissions(req.params.Id);
    if (tPermissions) {
      res.status(200).json(Response.GetSuccessResponse(tPermissions));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100, "There Is No Permission Found"));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.get("/roles", async (req, res, next) => {
  try {
    const tRoles = await AuthImp.GetAllRoles();
    if (tRoles) {
      res.status(200).json(Response.GetSuccessResponse(tRoles));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100, "There Is No Role Found"));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.get("/rolesViews", async (req, res, next) => {
  try {
    const tRoles = await AuthImp.GetRolesViews();
    if (tRoles) {
      res.status(200).json(Response.GetSuccessResponse(tRoles));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100, "There Is No X_Role Found"));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});

router.post("/createRole", async (req, res, next) => {
  try {
    let tRoleName = req.body.role;
    let ScreensId = req.body.screens;
    const tResult = await AuthImp.CreateRole(tRoleName, ScreensId);
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

router.post("/UpdateRole", async (req, res, next) => {
  try {
    let tRoleId = req.body.id;
    let tRoleName = req.body.role;
    let ScreensId = req.body.screens;
    const tResult = await AuthImp.UpdateRole(tRoleId, tRoleName, ScreensId);
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

router.post("/DeleteRole", async (req, res, next) => {
  try {
    let tRoleId = req.body.id;
    const tResult = await AuthImp.DeleteRole(tRoleId);
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

router.post("/CreateUser", async (req, res, next) => {
  try {
    let tUser = req.body;
    const tResult = await AuthImp.CreateUser(tUser);
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

router.post("/UpdateUser", async (req, res, next) => {
  try {
    let tUser = req.body.user;
    const tResult = await AuthImp.UpdateUser(tUser);
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

router.post("/DeleteUser", async (req, res, next) => {
  try {
    let tUserId = req.body.id;
    const tResult = await AuthImp.DeleteUserById(tUserId);
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

router.post("/signup", async (req, res, next) => {
  try {
    let tUser = req.body;
    const tResult = await AuthImp.Register(tUser);
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
