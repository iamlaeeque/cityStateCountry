const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const { PdfDocument } = require("@ironsoftware/ironpdf");

// body-parser
app.use(cors());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));
//http://localhost:3000/uploads/model.png
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.json());
app.use("/", require("../src/app/router"));
app.get("/generate-pdf", async (req, res) => {
  try {
    // Create a PDF from the HTML String
    const pdf = await PdfDocument.fromHtml("<h1>Hello from IronPDF!</h1>");

    // Define the file path for the downloaded PDF
    const filePath = path.join(
      __dirname,
      "downloads",
      "html-string-to-pdf.pdf"
    );

    // Save the PDF document to the file system
    await pdf.saveAs(filePath);

    // Send the file as a response
    res.download(filePath, "html-string-to-pdf.pdf");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

app.post("/generate-pdf", (req, res) => {
  const { apiResponse, htmlCode } = req.body;

  generatePdf(apiResponse, htmlCode)
    .then((pdfBuffer) => {
      // Specify the file path on the desktop
      const desktopPath = path.join(require("os").homedir(), "Desktop");
      const filePath = path.join(desktopPath, "output.pdf");

      // Save the PDF to the desktop
      fs.writeFileSync(filePath, pdfBuffer);

      console.log(`PDF saved to ${filePath}`);
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
    });
});

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

// app.use("/uploads", express.static(__dirname + "/uploads/"));
// 404 Route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// app.use((req, res, next) => {
//   res
//     .status(400)
//     .send(
//       `<h1> Page not found!!</h1><h4> Please Check URL - <b style="color:red">'${req.url}'</b></h4>`
//     );
// });
module.exports = app;
