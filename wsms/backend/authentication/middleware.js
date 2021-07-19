const order = require("../controllers/createOrder");
const {
  Order,
  get_by_id,
  get_all,
  delete_by_id,
  update_status,
} = require("../models/order");

module.exports.isLoggenIn = (req, res, get_all) => {
  console.log("Checking login status");
  if (!req.isAuthenticated()) {
    console.log("not logged in");
    req.session.returnTo = req.originalUrl;
    req.flash("error", "you must be logged in first");
    return res.redirect("/login");
  } else {
    console.log("Authentication confirmed");
  }
  get_all(req, res);
};

module.exports.isAuthor = async (req, res, next) => {
  console.log("Checking author status");
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!"author" === req.user.level) {
    req.flash("error", "You do not have permission to do that!");
    // jidhr bhi redirect kravana hai return res.redirect('')
  }
  next();
};
