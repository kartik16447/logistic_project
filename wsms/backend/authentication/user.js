const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { Warehouse } = require("../models/warehouse");
const { isLoggenIn, isAuthor } = require("../authentication/middleware");
