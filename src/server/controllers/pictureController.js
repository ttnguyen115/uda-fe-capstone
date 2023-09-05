"use strict"

class PictureController {
  signUp = async (req, res, next) => {
    try {
      console.log(`[P]::PictureController::${req.body}`);
      return res.status(201).json({})
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new PictureController();