const express = require("express");
const cors = require("cors");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("The Website is Working");
});

module.exports = router;
