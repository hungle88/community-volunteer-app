var createError = require("http-errors");
var express = require("express");
var path = require("path");
const env = require("dotenv").config();
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');


var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const url = process.env.URL;
const port = process.env.PORT || 5000;

var imgModel = require('../backend/models/image');


var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var postsRouter = require("./routes/posts");

var authRouter = require("./routes/auth");

const mongoose = require("mongoose");
const uaa = require("./middlewares/uaa");
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false });

var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");
app.use(cors({ origin: true, credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.set("view engine", "ejs");


app.use(uaa.checkToken) 

app.use("/", indexRouter);
app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postsRouter);


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });


app.listen(port, () => {
  console.log(`running on port ${port}`);
});

module.exports = app;
