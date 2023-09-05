"use strict";

const axios = require("axios");

const DEFAULT_API_KEY = "3a0fce97ccfe440b9a580cea743ce51e";
const FORECAST_DAY_RANGE = 7;

const weatherAxios = axios.create({
  baseURL: "https://api.weatherbit.io/v2.0",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: process.env.WEATHERBIT_API_KEY || DEFAULT_API_KEY,
  },
});

class WeatherController {
  findCurrentWeather = async (req, res, next) => {
    const params = {
      lat: req.body.lat,
      lon: req.body.lon,
    };
    try {
      console.log(`[P]::findCurrentWeather::${req.body}`);
      const { data, status } = await weatherAxios.get("/current", { params });
      return res.status(200).json({
        data,
        status,
        success: true,
      });
    } catch (e) {
      next(e);
    }
  };

  findForecastWeather = async (req, res, next) => {
    const params = {
      days: FORECAST_DAY_RANGE,
      lat: req.body.lat,
      lon: req.body.lon,
    };
    try {
      console.log(`[P]::findForecastWeather::${req.body}`);
      const { data, status } = await weatherAxios.get("/forecast/daily", { params });
      return res.status(200).json({
        data,
        status,
        success: true,
      });
    } catch (e) {
      next(e);
    }
  };
}

module.exports = new WeatherController();
