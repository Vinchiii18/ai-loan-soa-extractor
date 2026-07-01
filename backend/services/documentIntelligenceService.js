const fs = require("fs/promises");
const path = require("path");

const DocumentIntelligence =
  require("@azure-rest/ai-document-intelligence").default;

const {
  getLongRunningPoller,
  isUnexpected,
} = require("@azure-rest/ai-document-intelligence");

const { extract } = require("../extractors/extractorFactory");

const endpoint = process.env.DOCUMENT_INTELLIGENCE_ENDPOINT;
const apiKey = process.env.DOCUMENT_INTELLIGENCE_KEY;

const client = DocumentIntelligence(endpoint, {
  key: apiKey,
});

async function analyzeLoanDocument(filePath, originalFileName) {
  try {
    console.log(`Analyzing: ${originalFileName}`);

    const stats = await fs.stat(filePath);

    console.log(`File Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

    const file = await fs.readFile(filePath);

    console.log("Uploading document to Azure Document Intelligence...");

    const initialResponse = await client
      .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
      .post({
        contentType: "application/octet-stream",
        body: file,
      });

    if (isUnexpected(initialResponse)) {
      throw initialResponse.body.error;
    }

    console.log("Waiting for Azure analysis...");

    const poller = getLongRunningPoller(client, initialResponse);

    const response = await poller.pollUntilDone();

    console.log("Azure analysis completed.");

    // Transform OCR result
    const result = extract(response.body, filePath, originalFileName);

    // Save JSON files only during local development
    if (process.env.NODE_ENV !== "production") {
      const rawOutputDir = path.join(__dirname, "../output/raw");
      const transformedOutputDir = path.join(
        __dirname,
        "../output/transformed",
      );

      await fs.mkdir(rawOutputDir, { recursive: true });
      await fs.mkdir(transformedOutputDir, { recursive: true });

      await fs.writeFile(
        path.join(rawOutputDir, "document-analysis.json"),
        JSON.stringify(response.body, null, 2),
        "utf8",
      );

      await fs.writeFile(
        path.join(transformedOutputDir, "transformed-analysis.json"),
        JSON.stringify(result, null, 2),
        "utf8",
      );

      console.log("Debug JSON files saved.");
    }

    return result;
  } catch (error) {
    console.error("Document analysis failed:", error);
    throw error;
  } finally {
    // Always delete temporary uploaded file
    try {
      await fs.unlink(filePath);
      console.log("Temporary upload deleted.");
    } catch (err) {
      console.warn("Unable to delete temporary file:", err.message);
    }
  }
}

module.exports = {
  analyzeLoanDocument,
};
