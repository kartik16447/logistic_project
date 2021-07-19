const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("express-flash");

const loginRoutes = require("./routes/loginRoutes");
const orderRoutes = require("./routes/orderRoutes");
const warehouseRoutes = require("./routes/warehouseRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const consigneeRoutes = require("./routes/consigneeRoutes");
const debugRoutes = require("./routes/debugRoutes");
const { isLoggedIn, isAuthor } = require("./authentication/middleware");
const { Warehouse } = require("./models/warehouse");
const app = express();

//Cors Policy
// app.use(cors);

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//Using Body-Parsers
// parse application/json
app.use(bodyParser.json()); //using json requests through insomnia/postman

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false,
  })
);
// parse the raw data
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());

//Authentication
app.use(passport.initialize());
app.use(passport.session());
/*
empty req.body issue faced because the content type was not specified
*/

//Connecting to wsms database in localhost
const dbURI = "mongodb://127.0.0.1:27017/wsms";
// const dbURI =
//   "mongodb+srv://manan:manan@projects.dnlfa.mongodb.net/wsms?retryWrites=true&w=majority";

//Port 3000 and 5000/8000 are fine for development purposes
const port = 8000;

//TODO: Connect the env file without declaring the script as module

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port);
    console.log(`listening on port ${port}`);
  })
  .catch((err) => console.log(err));

passport.use(new LocalStrategy(Warehouse.authenticate()));

// passport.serializeUser(Warehouse.serializeUser());
// passport.deserializeUser(Warehouse.deserializeUser());
passport.serializeUser(function (user, done) {
  console.log("serializing...");
  console.log(user);
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  console.log("deserializing...");
  Warehouse.findById(id, function (err, user) {
    done(err, user);
  });
});
// a function for async if it gives an error just simply apply name wrapAsync aead of async
function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

//Homepage Get Function
app.get("/", (req, res, next) => {
  console.log(`request made for home page`);
  next();
});

//Directing respective routes-files
app.use(flash());
app.use("/login", loginRoutes);
app.use("/order", orderRoutes);
app.use("/warehouse", warehouseRoutes);
app.use("/vendor", vendorRoutes);
app.use("/consignee", consigneeRoutes);
app.use("/debug", debugRoutes);
