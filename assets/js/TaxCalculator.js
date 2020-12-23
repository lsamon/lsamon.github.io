export default class TaxCalculator {
  constructor(grossIncome = 0, socialSecurityDeducation = 0, employeeDeductions = 0, employerDeductions = 0) {
    this.grossIncome = grossIncome;
    this.socialSecurityDeducation = socialSecurityDeducation;
    this.employeeDeductions = employeeDeductions;
    this.employerDeductions = employerDeductions;
  }

  rate = () => {
    if(this.grossIncome <= 270000) {
      return 0.0;
    } else if(this.grossIncome <= 520000) {
      return 0.09;
    } else if(this.grossIncome <= 760000) {
      return 0.2;
    } else if(this.grossIncome <= 1000000) {
      return 0.25;
    } else {
      return 0.3;
    }
  }

  lowerBound = () => {
    if(this.grossIncome <= 270000) {
      return 0;
    } else if(this.grossIncome <= 520000) {
      return 270000;
    } else if(this.grossIncome <= 760000) {
      return 520000;
    } else if(this.grossIncome <= 1000000) {
      return 760000;
    } else {
      return 1000000;
    }
  } 

  lowerBoundPlus = () => {
    if(this.grossIncome <= 520000) {
      return 0;
    } else if(this.grossIncome <= 760000) {
      return 22500;
    } else if(this.grossIncome <= 1000000) {
      return 70500;
    } else {
      return 130500;
    }
  } 

  payE = () => {
    return ((this.grossIncome - this.lowerBound()) * this.rate()) + this.lowerBoundPlus();
  }

  otherDeductions = (deduction) => {
    return this.grossIncome * deduction;
  }

  incomeAfterPension = () => {
    return this.grossIncome - (this.otherDeductions(this.rate))
  }
  
  totalEmployeeDeductions = () => {
    return this.otherDeductions(this.employeeDeductions) + this.payE();
  }

  totalEmployerDeductions = (workersCompensation, skillsDevelopment) => {
    return this.socialSecurityDeducation + this.otherDeductions(workersCompensation) + this.otherDeductions(skillsDevelopment);
  }

  netIncome = () => {
    return this.grossIncome - this.totalEmployeeDeductions();
  }
}