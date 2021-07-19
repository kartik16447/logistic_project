const jwt = require("jsonwebtoken");
const { Warehouse } = require("../models/warehouse");

const requireAuth = (req, res, next) => {
  console.log("\n\nchecking authentication status...");
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "ircs secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        console.log("Authenticated User");
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// check current user
const checkUser = (req, res, next) => {
  console.log("checking current user");
  const token = req.cookies.jwt;
  console.log(req.cookies);
  if (token) {
    jwt.verify(token, "ircs secret", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        console.log(err);
        next();
      } else {
        let user = await Warehouse.findById(decodedToken.id);
        res.locals.user = user;
        console.log(`user set: ${user}`);
        next();
      }
    });
  } else {
    res.locals.user = null;
    console.log("empty token");
    next();
  }
};

const adminPermission = (req, res, next) => {
  console.log("\n\nchecking admin permission...");
  const token = req.cookies["jwt"];
  console.log(token);
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "ircs secret", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        console.log("Authenticated User");
        const level = res.locals.user.level;
        if (level === "admin") {
          console.log("admin operation permission granted");
          next();
        } else {
          console.log(`permission not granted`);
          console.log(`level: ${level}`);
          res.send("Hey! You are not an Admin!");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { requireAuth, checkUser, adminPermission };
