const express = require("express");
const cors = require("cors");

const consignee = require("../controllers/createConsignee");

const router = express.Router();

router.post("/", consignee.create_post);
router.get("/", consignee.get);
router.delete("/", consignee._delete);

module.exports = router;
