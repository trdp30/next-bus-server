require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var assistantDriverRouter = require("./controllers/assistantDriver");
var driverRouter = require("./controllers/driver");
var handymanRouter = require("./controllers/handyman");
var ownerRouter = require("./controllers/owner");
var placeRouter = require("./controllers/place");
var userRouter = require("./controllers/user");
var vehicleRouter = require("./controllers/vehicle");

const authentication = require("./middlewares/authentication");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/", indexRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/assistant-driver", authentication, assistantDriverRouter);
app.use("/v1/driver", authentication, driverRouter);
app.use("/v1/handyman", authentication, handymanRouter);
app.use("/v1/owner", authentication, ownerRouter);
app.use("/v1/place", authentication, placeRouter);
app.use("/v1/user", authentication, userRouter);
app.use("/v1/vehicle", authentication, vehicleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
