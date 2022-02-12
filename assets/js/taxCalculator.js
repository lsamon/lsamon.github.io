export default class TaxCalculator {
  constructor() {
    this.grossIncome = 0;
    this.socialSecurityDeduction = 0;
    this.employeeDeductions = 0;
    this.employerDeductions = 0;
  }

  taxRate = () => {
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

  fromAmount = () => {
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

  plusAmount = () => {
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
    return ((this.grossIncome - this.fromAmount()) * this.taxRate()) + this.plusAmount();
  }

  otherDeductions = (deduction) => {
    return this.grossIncome * deduction;
  }

  incomeAfterPension = () => {
    return this.grossIncome - (this.otherDeductions(this.taxRate))
  }
  
  totalEmployeeDeductions = () => {
    return this.otherDeductions(this.employeeDeductions) + this.payE();
  }

  totalEmployerDeductions = (workersCompensation, skillsDevelopment) => {
    return this.otherDeductions(this.socialSecurityDeduction)   + this.otherDeductions(workersCompensation) + this.otherDeductions(skillsDevelopment);
  }

  netIncome = () => {
    return this.grossIncome - this.totalEmployeeDeductions();
  }

  fetchData = (url) => {
    const data = fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })

    return data;
  }
}