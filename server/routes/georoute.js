const express = require("express");
const router = express.Router();
// //controller
const { getHomesWithinRadius } = require("../controllers/geodata.controller.js");
// //validator

router.route("/homes/:zipcode/:distance").get(getHomesWithinRadius);

module.exports = router;


