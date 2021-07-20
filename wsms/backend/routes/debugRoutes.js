const express = require("express");

const router = express.Router();

console.log("The website is working");

const confirm = (req, res) => {
  console.log("\n\nThe Website is Working");
  res.send("The Website is Working");
};

router.get("/", confirm);

module.exports = router;
