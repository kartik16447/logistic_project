const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const loginRoutes = require("./routes/loginRoutes");
const orderRoutes = require("./routes/orderRoutes");
const warehouseRoutes = require("./routes/warehouseRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const consigneeRoutes = require("./routes/consigneeRoutes");
const debugRoutes = require("./routes/debugRoutes");
const authRoutes = require("./routes/authRoutes");
const { Warehouse } = require("./models/warehouse");
const {
  requireAuth,
  checkUser,
  adminPermission,
} = require("./authentication/authMiddleware");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  // optionsSuccessStatus: 200,
  credentials: true, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//Using Body-Parsers
// parse application/json
app.use(bodyParser.json()); //using json requests through insomnia/postman

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse the raw data
app.use(bodyParser.raw());
// parse text
app.use(bodyParser.text());

/*
empty req.body issue faced because the content type was not specified
*/

//Cors Policy
app.use(cors(corsOptions));
//Use to solve non-responsive server by using cors on individual routes.

app.use(cookieParser());

//ROUTING:
app.use("*", checkUser);

//Homepage Get Function
app.get("/", (req, res, next) => {
  console.log(`request made for home page`);
  next();
});

//Directing respective routes-files
app.use("/debug", debugRoutes);
app.use("/order", requireAuth, orderRoutes);
app.use("/warehouse", adminPermission, warehouseRoutes);
app.use("/vendor", adminPermission, vendorRoutes);
app.use("/consignee", adminPermission, consigneeRoutes);
app.use(authRoutes);

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
