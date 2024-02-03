var express = require("express");
var router = express.Router();
const playerRouter = require("./player");
const laneRouter = require("./lanes");
const ticketRouter = require("./ticket");
const configRouter = require("./config");
router.use("/players", playerRouter);
router.use("/lanes", laneRouter);
router.use("/tickets", ticketRouter);
router.use("/config", configRouter);
module.exports = router;