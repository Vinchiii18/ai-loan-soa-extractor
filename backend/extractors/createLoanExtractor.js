const path = require("path");

const { getValue, applyFormatter } = require("../utils/formatter");

function createLoanExtractor(document, filePath, originalFileName, config) {
  const { mapping, benefitTypeCd, benefitTypeNm, documentCd } = config;

  const content = document.analyzeResult.content;

  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const extractedData = {};

  for (const [fieldName, config] of Object.entries(mapping)) {
    // Use default value if configured
    if (config.default !== undefined) {
      extractedData[fieldName] = config.default;
      continue;
    }

    // Get OCR value using all possible labels
    const rawValue = getValue(lines, config.labels);

    // Apply formatter
    extractedData[fieldName] = applyFormatter(rawValue, config.formatter);
  }

  const result = [
    {
      EmployeeId: "-",
      EmployeeNm: "-",
      EmployeeEid: "-",
      TransId: -1,
      BenefitNm: "Loan",
      BenefitTypeCd: benefitTypeCd,
      BenefitTypeNm: benefitTypeNm,
      UploadFileId: -1,
      Valid: [
        {
          UploadFileDetailId: -1,
          DocumentCd: documentCd,
          DocumentFileNm: originalFileName,
          ExtractedData: extractedData,
        },
      ],
    },
  ];

  return result;
}

module.exports = createLoanExtractor;
