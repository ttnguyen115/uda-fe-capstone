"use strict";

const express = require("express");
const router = express.Router();
const pictureController = require("../controllers/pictureController");

router.get("/picture", pictureController.signUp);

module.exports = router;
