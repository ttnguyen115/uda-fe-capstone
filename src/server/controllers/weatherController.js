"use strict"

class WeatherController {
  signUp = async (req, res, next) => {
    try {
      console.log(`[P]::WeatherController::${req.body}`);
      return res.status(201).json({})
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new WeatherController();