"use strict";

const axios = require("axios");

const MAX_LOCATION_COUNT = 1;
const DEFAULT_USERNAME = "ttnguyen115";

const locationAxios = axios.create({
  baseURL: "http://api.geonames.org/searchJSON",
  headers: {
    "Content-Type": "application/json",
  },
});

class LocationController {
  postLocation = async (req, res, next) => {
    const params = {
      name: req.body.name,
      maxRows: MAX_LOCATION_COUNT,
      username: process.env.USERNAME || DEFAULT_USERNAME,
    };
    try {
      console.log(`[P]::LocationController::${req.body}`);
      const { data, status } = await locationAxios.get("", { params });
      return res.status(201).json({
        data,
        status,
        success: true,
      });
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new LocationController();
