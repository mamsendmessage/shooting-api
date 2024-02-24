var express = require("express");
var router = express.Router();
const AuthImp = require("../implementation/authenticationImplementation");
const AuthenticationManager = require("../authentication/jwt-authentication");
const LoggerService = require("../services/LoggerService");
const Response = require('../models/Response');
const AuthenticatedUser = require('../models/AuthenticatedUser');
/* GET home page. */
router.post("/Login", async (req, res, next) => {
  try {
    let tUserInfo = req.body;
    const tUser = await AuthImp.Login(tUserInfo.Username, tUserInfo.Password);
    if (tUser) {
      const tToken = AuthenticationManager.generateAccessToken(tUser);
      const tAuthenticatedUser = new AuthenticatedUser(tUser.ID, tToken, tUser.Name, tUser.RoleId)
      res.status(200).json(Response.GetSuccessResponse(tAuthenticatedUser));
    } else {
      res.status(200).json(Response.GetErrorResponse(-100, "Invaild username or password"));
    }
  } catch (error) {
    LoggerService.Log(error);
    res.status(500).json(Response.GetGeneralError());
  }
});


module.exports = router;
