var payments = [];
var total;
const NSSF = 0.1

var taxOnIncome = function(amount, rate){
  return amount * rate;
}

var taxOnNSSF = function(amount){
  return amount * NSSF;
}

var calcTax = function(amount){
 var tax = 0;
    if(amount > 720000){
      tax = taxOnIncome(amount, 0.3) + 98100;
    }
    else if(amount > 540000){
      tax = taxOnIncome(amount, 0.25) + 53100;
    }
    else if( amount > 360000){
      tax = taxOnIncome(amount, 0.2) + 17100;
    }
    else if(amount > 170000){
      tax = taxOnIncome(amount, 0.09);
    }
    else{
      tax = taxOnIncome(amount, 0);
    }

    return tax;
}

$(document).ready(function(){
  $(".calc-form").on('submit', function (e) {
    e.preventDefault();
    var income = $('#tax-amount').val();

    var taxAmount = calcTax(income) + taxOnNSSF(income);
    var netIncome = income - taxAmount;

    console.log(taxAmount);
    console.log(netIncome);

    $('.base-income').text(income);
    $('.tax-on-income').text(calcTax(income));
    $('.social-security').text(taxOnNSSF(income));
    $('.total-tax').text(taxAmount);
    $('.net-income').text(income - taxAmount);

  });
})
