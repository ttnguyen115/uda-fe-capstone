"use strict";

const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");

router.post("/weather/current", weatherController.findCurrentWeather);
router.post("/weather/forecast", weatherController.findForecastWeather);

module.exports = router;
