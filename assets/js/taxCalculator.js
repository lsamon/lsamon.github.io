var calculator = {
  income: 0,
  taxAmount: 0,
  employerSocialDeductions: 0,
  employeeSocialDeductions: 0,
  totalDeductions: 0,
  SKILLSDEVELOPMENT: 0.045,
  WORKERSCOMPENSATION: 0.01,
  total: 0,
  taxOnIncome: function(income, lowerBracket, rate){
    return (income - lowerBracket) * rate;
  },
  taxOnMisc: function(income, rate){
    return income * rate;
  },
  incomeAfterPension: function(income, rate){
    return income - (this.taxOnMisc(income, rate))
  },
  calcTax: function(amount){
   var tax = 0;
      if(amount > 720000){
        tax = this.taxOnIncome(amount, 720000, 0.3) + 98100;
      }
      else if(amount > 540000){
        tax = this.taxOnIncome(amount, 540000, 0.25) + 53100;
      }
      else if( amount > 360000){
        tax = this.taxOnIncome(amount, 360000, 0.2) + 17100;
      }
      else if(amount > 170000){
        tax = this.taxOnIncome(amount, 170000, 0.09);
      }
      else{
        tax = this.taxOnIncome(amount, 0, 0);
      }
      return tax;
  }
};

var numberToHuman = function(number) {
  var nf = Intl.NumberFormat();
  return nf.format(number);
}
