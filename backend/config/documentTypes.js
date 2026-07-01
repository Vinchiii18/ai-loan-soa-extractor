const pagibigMapping = require("./pagibig/loanMapping");
const sssMapping = require("./sss/loanMapping");

module.exports = [
  {
    id: "PAGIBIG_LOAN",

    keywords: [
      { text: "virtual pag-ibig", weight: 5 },
      { text: "multi-purpose loan", weight: 5 },
      { text: "loan granted", weight: 4 },
      { text: "date granted", weight: 3 },
      { text: "amortization period", weight: 3 },
      { text: "outstanding balance", weight: 2 },
    ],

    mapping: pagibigMapping,

    benefitTypeCd: "PAGIBIG",

    benefitTypeNm: "Pag-IBIG Multi-Purpose Loan",

    documentCd: "PAGIBIG_LOAN",
  },

  {
    id: "SSS_LOAN",

    keywords: [
      { text: "certifying employer", weight: 5 },
      { text: "loan amount", weight: 5 },
      { text: "monthly amortization", weight: 4 },
      { text: "net amount", weight: 3 },
      { text: "first monthly amortization", weight: 3 },
    ],

    mapping: sssMapping,

    benefitTypeCd: "SSS",

    benefitTypeNm: "SSS Salary Loan",

    documentCd: "SSS_LOAN",
  },
];
