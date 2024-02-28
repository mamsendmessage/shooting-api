var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var messageAPI = require("./routes/messageAPI");
var anonymousMessageAPI = require("./routes/anonymousMessageAPI");
var authAPI = require("./routes/auth");
var Authent = require("./middlewares/authentication");
var app = express();
const bodyParser = require('body-parser');
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(bodyParser.json({ limit: '50mb' }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,content-disposition");
  res.header('Access-Control-Allow-Methods', 'POST, GET', 'OPTIONS');
  next();
});
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/documents', express.static(path.join(__dirname, 'documents')));
app.use(logger("dev"));


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/anonymous", anonymousMessageAPI);
app.use("/api", Authent.authenticateToken, messageAPI);
app.use("/auth", authAPI);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
