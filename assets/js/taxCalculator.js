var payments = [];
var total;
const NSSF = 0.1

var taxOnIncome = function(amount, lowerBracket, rate){
  return (amount - lowerBracket) * rate;
}

var taxOnNSSF = function(amount){
  return amount * NSSF;
}

var calcTax = function(amount){
 var tax = 0;
 amount = amount - taxOnNSSF(amount);
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

    var $pension = $('.check-pension');
    var taxAmount = 0;
    if($pension.is(':checked')){
      taxAmount = calcTax(income) + taxOnNSSF(income);
    } else {
      taxAmount = calcTax(income);
    }

    var netIncome = income - taxAmount;

    $('.base-income').text(income);
    $('.tax-on-income').text(calcTax(income));
    $('.social-security').text(taxOnNSSF(income));
    $('.total-tax').text(taxAmount);
    $('.net-income').text(income - taxAmount);

    $('.calc-result').fadeIn(1000);
    $('#tax-amount').val("");

  });
})
