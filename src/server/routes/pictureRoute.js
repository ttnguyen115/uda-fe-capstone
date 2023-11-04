"use strict";

const express = require("express");
const router = express.Router();
const pictureController = require("../controllers/pictureController");

router.post("/picture", pictureController.findPicture);

module.exports = router;
