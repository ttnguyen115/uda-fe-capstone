"use strict";

const express = require("express");
const router = express.Router();
const locationRoute = require("./locationRoute");
const pictureRoute = require("./pictureRoute");
const weatherRoute = require("./weatherRoute");

router.use("/api", locationRoute);
router.use("/api", pictureRoute);
router.use("/api", weatherRoute);

module.exports = router;
