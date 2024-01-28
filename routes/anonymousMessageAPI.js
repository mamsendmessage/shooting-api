var express = require("express");
var router = express.Router();
const playerRouter = require("./player");
router.use("/players", playerRouter);
module.exports = router;
// TODO:: 