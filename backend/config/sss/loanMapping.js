module.exports = {
  loanAmount: {
    labels: ["Loan Amount"],
    formatter: "currency",
  },

  loanApprovalDate: {
    default: "-",
  },

  loanStartDate: {
    labels: ["First Monthly Amortization"],
    formatter: "date",
  },

  approvedAmortizationAmount: {
    labels: ["Monthly Amortization"],
    formatter: "currency",
  },

  deductionPerPayPeriod: {
    labels: ["Monthly Amortization"],
    formatter: "currency",
  },

  loanEndDate: {
    default: "-",
  },

  chequeAmount: {
    labels: ["Net Amount"],
    formatter: "currency",
  },

  outstandingBalance: {
    labels: ["Outstanding Balance", "Total Amount of Obligation"],
    formatter: "currency",
  },
};
