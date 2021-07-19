const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const { vendorSchema } = require("./vendor");
const { warehouseSchema } = require("./warehouse");
const { itemSchema } = require("./item");

const Vendor = mongoose.model("Vendor", vendorSchema).schema;
const Warehouse = mongoose.model("Warehouse", warehouseSchema).schema;
const Item = mongoose.model("Item", itemSchema).schema;

const orderSchema = new Schema({
  receiverWarehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warehouse",
    unique: false,
  },
  senderWarehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warehouse",
    unique: false,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    unique: false,
  },
  consignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Consignee",
    unique: false,
  },
  items: {
    type: [Item],
  },
  totalValue: {
    type: Number,
    required: false,
    unique: false,
  },
  status: {
    type: [Item],
  },
  nature: {
    type: String,
    enum: ["inward", "outward"],
    required: true,
    unique: false,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
});
//TODO: Find a way to make Item.name in items array unique.

const Order = mongoose.model("Order", orderSchema);

const get_by_id = (req, res, id) => {
  const user = res.locals.user;
  var auth = false;
  console.log(user);

  Order.findById(id)
    .populate("receiverWarehouse")
    .populate("senderWarehouse")
    .populate("vendor")
    .exec()
    .then(function (data) {
      console.log(data);
      if (user.level != "user") {
        auth = true;
      } else if (data.senderWarehouse != null) {
        if (data.senderWarehouse._id === user._id) {
          auth = true;
        }
      } else if (data.receiverWarehouse != null) {
        if (data.receiverWarehouse_id === user._id) {
          auth = true;
        }
      }

      if (auth) {
        res.send(data);
        console.log(`Success!`);
      } else {
        console.log("You don't have the permission to see that!");
        res.send("You don't have the permission to see that!");
        console.log(`Success!`);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const get_all = (req, res) => {
  const user = res.locals.user;
  console.log(user);
  // Order.find({ vendor: "60d3a4e5edad0186bb03bc06" })
  // Order.find({ warehouse: "60d3a3cea594a9866b624cf9" })
  if (user.level == "user") {
    Order.find({ receiverWarehouse: user._id })
      // Order.find({})
      .populate("receiverWarehouse")
      .populate("senderWarehouse")
      .populate("vendor")
      .exec()
      .then(function (data) {
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    Order.find({})
      .populate("receiverWarehouse")
      .populate("senderWarehouse")
      .populate("vendor")
      .exec()
      .then(function (data) {
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const delete_by_id = (req, res, id) => {
  const user = res.locals.user;
  var auth = false;
  if (user.level != "user") {
    auth = true;
  }
  if (auth) {
    Order.findByIdAndDelete(id)
      .exec()
      .then(function (data) {
        res.send(data);
        console.log("Deleted!");
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("delete permission denied");
    res.send("delete permission denied");
  }
};

const update_status = (req, res, id, status, isDelivered) => {
  const user = res.locals.user;
  var auth = false;
  console.log(user);
  Order.findById(id, function (err, doc) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (user.level != "user") {
        auth = true;
      } else if (doc.receiverWarehouse != null) {
        if (doc.receiverWarehouse._id === user._id) {
          auth = true;
        }
      }
      if (auth) {
        doc.status = status;
        doc.isDelivered = isDelivered;
        doc.save();
        res.send(doc);
      } else {
        console.log("status update permission denied");
      }
    }
  }).catch((error) => {
    console.log(error);
  });
};

module.exports = {
  Order,
  get_by_id,
  get_all,
  delete_by_id,
  update_status,
};
