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

var numberToHuman = function(number) {
  var nf = Intl.NumberFormat();
  return nf.format(number);
}

$(document).ready(function(){
  var $rows = $('.tax-info tr')
  for(var i = 0; i < $rows.length; i++){
    var tr = $rows[i];
    if(i % 2 === 0){
      $(tr).addClass('highlighted');
    }
  }

  // toggle class for the percentage buttons
  $('.radio').on('click', function(){
    if($(this).hasClass('five')){
      $(this).addClass('clicked');
      if($('.ten').hasClass('clicked')){
        $('.ten').removeClass('clicked');
      }
    } else if($(this).hasClass('ten')){
      $(this).addClass('clicked');
      if($('.five').hasClass('clicked')){
        $('.five').removeClass('clicked');
      }
    } else { }
  });


  $('.calc-result').hide();
  $(".calc-form").on('submit', function (e) {
    e.preventDefault(); // Prevent the default action of submitting a form
    var income = $('#tax-amount').val();
    var taxAmount = 0;
    var socialDeductions = 0;

    // check if the Percentage Divs have been clicked
    var $foundFiveClicked = $('.five.radio.clicked');
    var $foundTenClicked = $('.ten.radio.clicked');

      if($foundFiveClicked.length > 0){
        taxAmount = calcTax(incomeAfterPension(income, 0.05));
        socialDeductions = taxOnMisc(income, 0.15);
      } else if($foundTenClicked.length > 0) {
        taxAmount = calcTax(incomeAfterPension(income, 0.1));
        socialDeductions = taxOnMisc(income, 0.1);
      }else {
      alert("Please select your social security deduction rate!");
      return;
    }

    var netIncome = income - taxAmount;

    // Employee Deductions
    $('.base-income').text(numberToHuman(income));
    $('.tax-on-income').text(numberToHuman(taxAmount));
    $('.ss-employee').text(numberToHuman(taxOnMisc(income, 0.2) - socialDeductions));
    $('.total-employee-deductions').text(numberToHuman(socialDeductions + taxAmount));
    $('.net-income').text(numberToHuman(income - taxAmount));
    // Deductions end here

    // Employer deductions
    $('.skills-dev').text(numberToHuman(taxOnMisc(income, SKILLSDEVELOPMENT)));
    $('.ss-employer').text(numberToHuman(socialDeductions));
    $('.workers-comp').text(numberToHuman(taxOnMisc(income, WORKERSCOMPENSATION)));
    var totalDeductions = taxOnMisc(income, SKILLSDEVELOPMENT) + socialDeductions + taxOnMisc(income, WORKERSCOMPENSATION);
    $('.total-deductions').text(numberToHuman(totalDeductions));

    //Employer deductions end here

    $('.calc-result').fadeIn(1000);
    $('#tax-amount').val("");

  });
})
