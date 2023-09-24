const express = require("express");
const router = express.Router();

router.use("/pokemon", require("./pokemon-api-routes.js"));

module.exports = router;
