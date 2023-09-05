"use strict";

const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.post("/location", locationController.postLocation);

module.exports = router;
