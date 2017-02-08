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
      tax = taxOnIncome(amount - 720000, 0.3) + 98100;
    }
    else if(amount > 540000){
      tax = taxOnIncome(amount - 540000, 0.25) + 53100;
    }
    else if( amount > 360000){
      tax = taxOnIncome(amount - 360000, 0.2) + 17100;
    }
    else if(amount > 170000){
      tax = taxOnIncome(amount - 170000, 0.09);
    }
    else{
      tax = taxOnIncome(amount, 0);
    }

    return tax;
}

$(document).ready(function(){
  $('.calc-result').hide();
  $(".calc-form").on('submit', function (e) {
    e.preventDefault();
    var income = $('#tax-amount').val();

    var $pension = $('.check-pension');
    var taxAmount = 0;
    if($pension.is(':checked')){
      taxAmount = calcTax(income) + taxOnNSSF(income);
    } else {
      taxAmount = calcTax(income);
    }


    var netIncome = income - taxAmount;

    console.log(taxAmount);
    console.log(netIncome);

    $('.base-income').text(income);
    $('.tax-on-income').text(calcTax(income));
    $('.social-security').text(taxOnNSSF(income));
    $('.total-tax').text(taxAmount);
    $('.net-income').text(income - taxAmount);

    $('.calc-result').fadeIn(1000);

  });
})
