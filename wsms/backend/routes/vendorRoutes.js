const express = require("express");
const cors = require("cors");
const {
  requireAuth,
  checkUser,
  adminPermission,
} = require("../authentication/authMiddleware");
const vendor = require("../controllers/createVendor");

const router = express.Router();

router.post("/", vendor.create_post);
router.get("/", vendor.get);
router.delete("/", vendor._delete);

module.exports = router;
