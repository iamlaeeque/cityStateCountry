const express = require("express");
const router = express.Router();
const countryController = require("../../controller/country_master/controller.country_master");

router.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Good Afternoom!",
  });
});
router.post("/getModelData", countryController.getModelData);
router.post("/createUpdateModelData", countryController.setModelData);
router.post("/fetchData", countryController.fetchData);
router.post("/removeModelData", countryController.remvoeModelData);

module.exports = router;
