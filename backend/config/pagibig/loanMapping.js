module.exports = {
  loanAmount: {
    labels: ["Loan Granted"],
    formatter: "currency",
  },

  loanApprovalDate: {
    labels: ["Date Granted"],
    formatter: "date",
  },

  loanStartDate: {
    labels: ["Amortization Period"],
    formatter: "startDate",
  },

  approvedAmortizationAmount: {
    labels: ["Amortization"],
    formatter: "currency",
  },

  deductionPerPayPeriod: {
    labels: ["Amortization"],
    formatter: "currency",
  },

  loanEndDate: {
    labels: ["Amortization Period"],
    formatter: "endDate",
  },

  chequeAmount: {
    default: "-",
  },

  outstandingBalance: {
    labels: ["Outstanding Balance"],
    formatter: "currency",
  },
};
