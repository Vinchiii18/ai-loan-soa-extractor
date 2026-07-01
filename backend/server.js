require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const {
  analyzeLoanDocument,
} = require("./services/documentIntelligenceService");

const app = express();

const PORT = 3000;

app.use(cors());

app.use(express.json());

const upload = multer({
  dest: "uploads/",
});

app.get("/", (req, res) => {
  res.send("Loan Statement Extractor API is running!");
});

app.post("/api/v1/loan/analyze", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded.",
      });
    }

    console.log("Uploaded:", req.file.originalname);
    console.log(req.file);
    const result = await analyzeLoanDocument(
      req.file.path,
      req.file.originalname,
    );

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Analysis failed.",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.log("Endpoint:", process.env.DOCUMENT_INTELLIGENCE_ENDPOINT);
console.log("Key exists:", !!process.env.DOCUMENT_INTELLIGENCE_KEY);
