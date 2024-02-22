const express = require("express");
const router = express.Router();
const importController = require("../../controller/import-export/controller.import");

router.post("/excelToDB", importController.excelToDB);
router.post("/DBToPDF", importController.DBToPDF);

module.exports = router;
