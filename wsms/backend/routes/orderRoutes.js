const express = require("express");
const cors = require("cors");

const order = require("../controllers/createOrder");
const {
  requireAuth,
  checkUser,
  adminPermission,
} = require("../authentication/authMiddleware");

const router = express.Router();

router.post("/", adminPermission, order.create);
router.get("/", order.get);
router.delete("/", adminPermission, order._delete);
router.patch("/status", order.update);

module.exports = router;
