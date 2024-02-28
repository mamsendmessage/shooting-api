var express = require("express");
var router = express.Router();
var path = require("path");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.json(`The API Server Is Running!`);
});

router.get('/download/:filename', (req, res) => {
  try {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, '../documents', fileName);
    res.download(filePath);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
