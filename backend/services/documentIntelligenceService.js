const fs = require("fs/promises");

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
  console.log("Analyzing documentAAAAAAAAAAAAA:", originalFileName);
  const stats = await fs.stat(filePath);

  console.log("File Size:", (stats.size / 1024 / 1024).toFixed(2), "MB");

  const file = await fs.readFile(filePath);

  console.log("Uploading document to Azure...");

  const initialResponse = await client
    .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
    .post({
      contentType: "application/octet-stream",
      body: file,
    });

  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }

  console.log("Waiting for Azure...");

  const poller = getLongRunningPoller(client, initialResponse);

  const response = await poller.pollUntilDone();

  console.log("Analysis completed.");

  // Save raw Azure response
  await fs.writeFile(
    "../output/raw/document-analysis.json",
    JSON.stringify(response.body, null, 2),
    "utf8",
  );

  // Transform OCR result
  const result = extract(response.body, filePath, originalFileName);

  // Save transformed response
  await fs.writeFile(
    "../output/transformed/transformed-analysis.json",
    JSON.stringify(result, null, 2),
    "utf8",
  );

  console.log("Transformed analysis saved.");

  return result;
}

module.exports = {
  analyzeLoanDocument,
};
