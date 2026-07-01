require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const {
  analyzeLoanDocument,
} = require("./services/documentIntelligenceService");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-loan-soa-extractor.vercel.app",
    ],
  }),
);
app.use(express.json());

const upload = multer({
  dest: "uploads/",
});

// Health Check
app.get("/", (req, res) => {
  res.send("Loan Statement Extractor API is running!");
});

// Analyze Loan Statement
app.post("/api/v1/loan/analyze", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded.",
      });
    }

    console.log(`Processing file: ${req.file.originalname}`);

    const result = await analyzeLoanDocument(
      req.file.path,
      req.file.originalname,
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("Analysis failed:", error);

    return res.status(500).json({
      message: "Analysis failed.",
      error: error.message,
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Endpoint:", process.env.DOCUMENT_INTELLIGENCE_ENDPOINT);
  console.log(
    "Document Intelligence Key Loaded:",
    !!process.env.DOCUMENT_INTELLIGENCE_KEY,
  );
});
