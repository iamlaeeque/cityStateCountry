var XLSX = require("xlsx");
const { DataTypes } = require("sequelize");
const Model = require("../../models");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");

const excelToDB = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const excelFile = req.files.excelFile;

    const workbook = XLSX.read(excelFile.data, { type: "buffer" });
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );

    const columns = Object.entries(xlData[0]).map((column) => ({
      [column[0].replace(/\s/g, "")]: { type: DataTypes.STRING },
    }));

    // console.log(JSON.stringify(columns));

    //define table
    const model = await Model.sequelize.define(
      sheet_name_list[0],
      Object.assign({}, ...columns),
      { freezeTableName: true }
    );

    Model.addModel(model);

    await Model.sequelize.sync({ alter: true }); //create table

    await model.bulkCreate(xlData); //insert data

    res.status(200).json(xlData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DBToPDF = async (req, res) => {
  // try {
  //   const { modelName } = req.body;

  //   if (!modelName) {
  //     return res
  //       .status(400)
  //       .json({ error: "Model name is required in the request body!" });
  //   }

  //   const validModelNames = Object.keys(Model);
  //   console.log("Valid model names:", validModelNames);

  //   if (!Model[modelName]) {
  //     return res.status(404).json({ error: `Model '${modelName}' not found` });
  //   }

  //   const modelData = await Model[modelName].findAll();

  //   console.log(modelData);

  //   res.status(200).json(modelData);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }

  const { apiResponse, htmlCode } = req.body;

  generatePdf(apiResponse, htmlCode)
    .then((pdfBuffer) => {
      const desktopPath = path.join(require("os").homedir(), "Desktop");
      const filePath = path.join(desktopPath, "output.pdf");

      fs.writeFileSync(filePath, pdfBuffer);

      console.log(`PDF saved to ${filePath}`);
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
    });
};

async function generatePdf(apiResponse, htmlCode) {
  // Create a new HTML template using Handlebars
  const template = handlebars.compile(htmlCode);

  // Use the template to generate HTML content with API response data
  const htmlContent = template(apiResponse);

  // Launch a headless browser
  const browser = await puppeteer.launch();

  try {
    // Open a new page
    const page = await browser.newPage();

    // Set the HTML content of the page
    await page.setContent(htmlContent);

    // Generate PDF buffer
    const pdfBuffer = await page.pdf({ format: "A4" });

    return pdfBuffer;
  } finally {
    // Close the browser
    await browser.close();
  }
}

module.exports = {
  excelToDB,
  DBToPDF,
};
