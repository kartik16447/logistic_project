const { Item } = require("../models/item");
const {
  Order,
  get_by_id,
  get_all,
  delete_by_id,
  update_status,
} = require("../models/order");
const { Warehouse } = require("../models/warehouse");
const { Vendor } = require("../models/vendor");
const { Consignee } = require("../models/consignee");
const { isLoggedIn, isAuthor } = require("../authentication/middleware");

const create = (req, res) => {
  const body = req.body;
  console.log(`\n\npost request for Order ${body}\n\n`);
  // const newOrder = new Order(req.body);
  //Alternate Method:

  if (body.nature == "outward") {
    var swid = "";
    var rwid = "";
    var cid = "";
    Warehouse.findOne({ name: body.sendersName })
      .exec()
      .then(function (data) {
        console.log(data._id);
        swid = data._id;
      })
      .then(function (data) {
        if (body.type === "consignee") {
          Consignee.findOne({ name: body.receiversName })
            .exec()
            .then(function (data) {
              console.log(data._id);
              cid = data._id;
            })
            .then(function (data) {
              create_outward_post_c(req, res, swid, cid, body);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          Warehouse.findOne({ name: body.receiversName })
            .exec()
            .then(function (data) {
              console.log(data._id);
              rwid = data._id;
            })
            .then(function (data) {
              create_outward_post_rw(req, res, swid, rwid, body);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    var vid = "";
    var rwid = "";

    Warehouse.findOne({ name: body.warehouseName })
      .exec()
      .then(function (data) {
        console.log(data._id);
        rwid = data._id;
      })
      .then(function (data) {
        Vendor.findOne({ name: body.vendorName })
          .exec()
          .then(function (data) {
            console.log(data._id);
            vid = data._id;
          })
          .then(function (data) {
            create_inward_post(req, res, vid, rwid, body);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const create_outward_post_c = (req, res, swid, cid, body) => {
  const newOrder = new Order({
    senderWarehouse: swid,
    consignee: cid,
    items: body.item,
    status: body.item,
    nature: body.nature,
  });
  newOrder
    .save()
    .then((result) => {
      res.redirect("/");
      console.log(result);
      console.log(`Success!`);
      // console.log(get_vendor_by_id(req, res, req.body.vendorId));
    })
    .catch((err) => {
      console.log(err);
      console.log(req.body);
      res.redirect("/");
    });
};

const create_outward_post_rw = (req, res, swid, rwid, body) => {
  const newOrder = new Order({
    senderWarehouse: swid,
    receiverWarehouse: rwid,
    items: body.item,
    status: body.item,
    nature: body.nature,
  });
  newOrder
    .save()
    .then((result) => {
      res.redirect("/");
      console.log(result);
      console.log(`Success!`);
      // console.log(get_vendor_by_id(req, res, req.body.vendorId));
    })
    .catch((err) => {
      console.log(err);
      console.log(req.body);
      res.redirect("/");
    });
};

const create_inward_post = (req, res, vid, rwid, body) => {
  const newOrder = new Order({
    receiverWarehouse: rwid,
    vendor: vid,
    items: body.item,
    status: body.item,
    nature: body.nature,
  });
  newOrder
    .save()
    .then((result) => {
      res.redirect("/");
      console.log(result);
      console.log(`Success!`);
      // console.log(get_vendor_by_id(req, res, req.body.vendorId));
    })
    .catch((err) => {
      console.log(err);
      console.log(req.body);
      res.redirect("/");
    });
};

const get = (req, res) => {
  console.log(`get request made for order page`);
  if (req.query.id != null) {
    const id = req.query.id;
    console.log(`get request made for order: ${id}`);
    get_by_id(req, res, id);
  } else {
    console.log("getting all orders");
    get_all(req, res);
    // isLoggedIn;
  }
};

const _delete = (req, res) => {
  console.log(`delete request made`);
  if (req.query.id != null) {
    const id = req.query.id;
    console.log(`delete request made for order: ${id}`);
    delete_by_id(req, res, id);
  } else {
    console.log(`please provide an id to delete`);
  }
};

const update = (req, res) => {
  console.log(`update request made`);
  const id = req.body._id;
  const status = req.body.status;
  const idDelivered = req.body.isDelivered;
  update_status(req, res, id, status, isDelivered);
};

module.exports = {
  create,
  get,
  _delete,
  update,
};
