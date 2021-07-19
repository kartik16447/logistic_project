const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { Warehouse } = require("../models/warehouse");
const { isLoggenIn, isAuthor } = require("../authentication/middleware");

const router = express.Router();
router.use(cors());
// router.use(flash());

//Authentication Routes
router.get("/", (req, res) => {
  console.log("get request made for login");
});

router.post("/", async function (req, res) {
  var inputUsername = req.body.username;
  var user;
  var promise = await Warehouse.findOne({ username: inputUsername })
    .exec()
    .then(function (data) {
      console.log(req.body.username);
      console.log(data._id);
      user = data;
    })
    .then(function (data) {
      sampleLogin(req, res, user);
    });
});

const sampleLogin = (req, res, user) => {
  console.log("logging in...");
  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("no errors detected");
      // console.log(req);
      passport.authenticate("local")(req, res, function () {
        console.log("Authentication Successful!");
        res.redirect("/users/" + req.user.username);
      });
    }
  });
  isLoggenIn;
};

// router.post(
//   "/",
//   passport.authenticate("local", {
//     failureFlash: true,
//     failureRedirect: "/login",
//   }),
//   (req, res) => {
//     console.log("post request made for login");
//     req.flash("success", "welcome back!");
//     const redirectUrl = req.session.returnTo || "/";
//     delete req.session.returnTo;
//     // res.redirect(redirectUrl);
//   }
// );

router.get("/logout", (req, res) => {
  console.log(`logout request received`);
  req.logout();
  req.flash("success", "Goodbye!");
  res.redirect("/");
});

module.exports = router;
