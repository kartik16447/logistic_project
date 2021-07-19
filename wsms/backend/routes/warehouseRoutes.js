const express = require("express");
const cors = require("cors");

const warehouse = require("../controllers/createWarehouse");

const router = express.Router();

router.post("/", warehouse.create_post);
router.get("/", warehouse.get);
router.delete("/", warehouse._delete);
router.get("/name/", warehouse.get_id_by_name);
module.exports = router;
