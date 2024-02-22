const express = require("express");
const router = express.Router();

router.use("/api", require("./country_master"));
router.use("/import", require("./import"));

module.exports = router;
