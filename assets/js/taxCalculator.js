const SKILLSDEVELOPMENT = 0.045;
const WORKERSCOMPENSATION = 0.01;
var total;

var taxOnIncome = function(income, lowerBracket, rate){
  return (income - lowerBracket) * rate;
}

var taxOnMisc = function(income, rate){
  return income * rate;
}

var incomeAfterPension = function(income, rate){
  return income - (taxOnMisc(income, rate))
}

var calcTax = function(amount){
 var tax = 0;
    if(amount > 720000){
      tax = taxOnIncome(amount, 720000, 0.3) + 98100;
    }
    else if(amount > 540000){
      tax = taxOnIncome(amount, 540000, 0.25) + 53100;
    }
    else if( amount > 360000){
      tax = taxOnIncome(amount, 360000, 0.2) + 17100;
    }
    else if(amount > 170000){
      tax = taxOnIncome(amount, 170000, 0.09);
    }
    else{
      tax = taxOnIncome(amount, 0, 0);
    }

    return tax;
}

$(document).ready(function(){
  var $rows = $('.tax-info tr')
  for(var i = 0; i < $rows.length; i++){
    var tr = $rows[i];
    if(i % 2 === 0){
      $(tr).addClass('highlighted');
    }
  }


  $('.calc-result').hide();
  $(".calc-form").on('submit', function (e) {
    e.preventDefault();
    var income = $('#tax-amount').val();
    var taxAmount = 0;
    var socialDeductions = 0;

    if($('.five').is(':checked')){
      taxAmount = calcTax(incomeAfterPension(income, 0.05));
      socialDeductions = taxOnMisc(income, 0.15);
    } else if($('.ten').is(':checked')){
      taxAmount = calcTax(incomeAfterPension(income, 0.1));
      socialDeductions = taxOnMisc(income, 0.1);
    } else {
      alert('Please select your social security deduction rate!');
      return;
    }

    var netIncome = income - taxAmount;
    // Employee Deductions
    $('.base-income').text(income);
    $('.tax-on-income').text(taxAmount);
    $('.ss-employee').text(taxOnMisc(income, 0.2) - socialDeductions);
    $('.net-income').text(income - taxAmount);
    // Deductions end here

    // Employer deductions
    $('.skills-dev').text(taxOnMisc(income, SKILLSDEVELOPMENT));
    $('.ss-employer').text(socialDeductions);
    $('.workers-comp').text(taxOnMisc(income, WORKERSCOMPENSATION));
    var totalDeductions = taxOnMisc(income, SKILLSDEVELOPMENT) + socialDeductions + taxOnMisc(income, WORKERSCOMPENSATION);
    $('.total-deductions').text(totalDeductions);

    //Employer deductions end here

    $('.calc-result').fadeIn(1000);
    $('#tax-amount').val("");

  });
})
