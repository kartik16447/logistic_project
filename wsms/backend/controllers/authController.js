const { Warehouse } = require("../models/warehouse");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", password: "" };

  // incorrect username
  if (err.message === "incorrect username") {
    errors.username = "That username is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate username error
  if (err.code === 11000) {
    errors.username = "that username is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "ircs secret", {
    expiresIn: maxAge,
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.send("signup");
};

module.exports.login_get = (req, res) => {
  console.log("get request received for login");
  res.send("login");
};

module.exports.signup_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Warehouse.create({ username, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Warehouse.login(username, password);
    console.log(user);
    const token = createToken(user._id);
    res
      // .setHeader("Access-Control-Allow-Credentials", true)
      .cookie("jwt", token, {
        httpOnly: true,
        path: "/",
        domain: "localhost:3000",
        secure: true,
        sameSite: "none",
        maxAge: maxAge * 1000,
      });
    console.log(req.cookies);
    res
      // .setHeader("Access-Control-Allow-Credentials", true)
      .status(200)
      .json({ user: user._id });
    // res;
    console.log("Login Successful!");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
