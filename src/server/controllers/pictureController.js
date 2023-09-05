"use strict"

const axios = require("axios");

const DEFAULT_API_KEY = "39257147-c6b046ccbf3a152f1ec777aa8";
const MAX_PICTURE_COUNT = 10;

const locationAxios = axios.create({
  baseURL: "https://pixabay.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: process.env.PIXABAY_API_KEY || DEFAULT_API_KEY,
    image_type: "photo",
    per_page: MAX_PICTURE_COUNT,
  }
});

class PictureController {
  findPicture = async (req, res, next) => {
    const params = { q: req.body.keyword };
    try {
      console.log(`[P]::PictureController::${req.body}`);
      const { data, status } = await locationAxios.get("", { params });
      return res.status(200).json({
        data: data.hits,
        status,
        success: true,
      })
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new PictureController();