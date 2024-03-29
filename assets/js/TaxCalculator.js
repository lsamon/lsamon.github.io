const TOTAL_SS_DEDUCTIONS = 0.2;
export default class TaxCalculator {
  constructor() {
    this.grossIncome = 0;
    this.socialSecurityDeduction = 0;
    this.workersCompensation = 0.006;
    this.skillsDevelopment = 0.04;
    this.taxData = null;
  }

  fromAmount = () => {
    const item = this.currentTaxObject();
    if(item.lowerBand === 0 ) return 0;

    return item.lowerBand - 1;
  }

  payE = () => {
    const taxInfo = this.currentTaxObject();
    return taxInfo.extraAmount + taxInfo.taxRate * (this.taxableIncome() - this.fromAmount());
  }

  otherDeductions = (deduction) => {
    return this.grossIncome * deduction;
  }

  taxableIncome = () => {
    return this.grossIncome - this.otherDeductions(this.socialSecurityDeduction);
  }

  incomeAfterPension = () => {
    return this.taxableIncome() - (this.otherDeductions(this.taxRate))
  }

  socialSecurityEmployerContribution = () => {
    return Math.round(this.otherDeductions(TOTAL_SS_DEDUCTIONS - this.socialSecurityDeduction));
  }
  
  totalEmployeeDeductions = () => {
    return this.otherDeductions(this.socialSecurityDeduction) + this.payE();
  }

  totalEmployerDeductions = (workersCompensation, skillsDevelopment) => {
    return this.otherDeductions(workersCompensation) + this.otherDeductions(skillsDevelopment);
  }

  totalPayableByEmployer = () => {
    return this.socialSecurityEmployerContribution() + this.totalEmployerDeductions(this.workersCompensation, this.skillsDevelopment);
  }

  netIncome = () => {
    return this.grossIncome - this.totalEmployeeDeductions();
  }

  currentTaxObject = () => {
    const self = this;
    const items = this.taxData.filter((item) => {
      const upperBand = item.upperBand === null ? Infinity : item.upperBand;
      return self.grossIncome >= item.lowerBand && self.grossIncome <= upperBand;
    });

    return items[0];
  }
}
