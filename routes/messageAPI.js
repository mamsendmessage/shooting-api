var express = require("express");
var router = express.Router();
const playerRouter = require("./player");
const laneRouter = require("./lanes");
const ticketRouter = require("./ticket");
router.use("/players", playerRouter);
router.use("/lanes", laneRouter);
router.use("/tickets", ticketRouter);
module.exports = router;