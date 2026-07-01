function getValue(lines, labels) {
  if (!Array.isArray(labels)) {
    labels = [labels];
  }

  for (const label of labels) {
    const index = lines.findIndex(
      (line) => line.toLowerCase() === label.toLowerCase(),
    );

    if (index !== -1) {
      return lines[index + 1] ?? "-";
    }
  }

  return "-";
}

function cleanCurrency(value) {
  if (!value || value === "-") {
    return "-";
  }

  return value.replace(/[₱,\s]/g, "").trim();
}

function formatDate(value) {
  if (!value || value === "-") {
    return "-";
  }

  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return "-";
  }

  return date.toISOString().split("T")[0];
}

function applyFormatter(value, formatter) {
  switch (formatter) {
    case "currency":
      return cleanCurrency(value);

    case "date":
      return formatDate(value);

    case "startDate":
      return extractStartDate(value);

    case "endDate":
      return extractEndDate(value);

    default:
      return value ?? "-";
  }
}

function extractStartDate(value) {
  if (!value || value === "-") return "-";

  const [start] = value.split("-");

  return formatDate(start.trim());
}

function extractEndDate(value) {
  if (!value || value === "-") return "-";

  const [, end] = value.split("-");

  if (!end) return "-";

  return formatDate(end.trim());
}

module.exports = {
  getValue,
  cleanCurrency,
  formatDate,
  applyFormatter,
};
