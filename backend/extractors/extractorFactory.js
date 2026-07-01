const createLoanExtractor = require("./createLoanExtractor");

const documentTypes = require("../config/documentTypes");

function calculateScore(content, keywords) {
  let score = 0;

  let maxScore = 0;

  for (const keyword of keywords) {
    maxScore += keyword.weight;

    if (content.includes(keyword.text.toLowerCase())) {
      score += keyword.weight;
    }
  }

  return {
    score,
    confidence: Math.round((score / maxScore) * 100),
  };
}

function extract(document, filePath, originalFileName) {
  const content = document.analyzeResult.content.toLowerCase();

  let bestMatch = null;

  let highestScore = -1;

  for (const documentType of documentTypes) {
    const result = calculateScore(content, documentType.keywords);

    console.log(`${documentType.id} -> ${result.confidence}%`);

    if (result.score > highestScore) {
      highestScore = result.score;

      bestMatch = documentType;
    }
  }

  if (!bestMatch || highestScore === 0) {
    throw new Error("Unsupported loan document.");
  }

  console.log(`Selected Document Type: ${bestMatch.id}`);

  return createLoanExtractor(document, filePath, originalFileName, {
    mapping: bestMatch.mapping,
    benefitTypeCd: bestMatch.benefitTypeCd,
    benefitTypeNm: bestMatch.benefitTypeNm,
    documentCd: bestMatch.documentCd,
  });
}

module.exports = {
  extract,
};
