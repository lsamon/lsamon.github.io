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
    calculator;
    e.preventDefault(); // Prevent the default action of submitting a form

    calculator.income = $('#tax-amount').val();

    // check if the Percentage Divs have been clicked
    var $foundFiveClicked = $('.five.radio.clicked');
    var $foundTenClicked = $('.ten.radio.clicked');

      if($foundFiveClicked.length > 0){
        calculator.taxAmount = calculator.calcTax(calculator.incomeAfterPension(calculator.income, 0.05));
        calculator.employeeSocialDeductions = calculator.taxOnMisc(calculator.income, 0.05);
        calculator.employerSocialDeductions = calculator.taxOnMisc(calculator.income, 0.15);
      } else if($foundTenClicked.length > 0) {
        calculator.taxAmount = calculator.calcTax(calculator.incomeAfterPension(calculator.income, 0.1));
        calculator.employeeSocialDeductions = calculator.taxOnMisc(calculator.income, 0.1);
        calculator.employerSocialDeductions = calculator.taxOnMisc(calculator.income, 0.1);
      }else {
      alert("Please select your social security deduction rate!");
      return;
    }

    calculator.netIncome = calculator.income - (calculator.taxAmount + calculator.employeeSocialDeductions);

    // Employee Deductions
    $('.base-income').text(numberToHuman(calculator.income));
    $('.tax-on-income').text(numberToHuman(calculator.taxAmount));
    $('.ss-employee').text(numberToHuman(calculator.employeeSocialDeductions));
    $('.total-employee-deductions').text(numberToHuman(calculator.totalEmployeeDeductions(calculator.taxAmount,calculator.employeeSocialDeductions)));
    $('.net-income').text(numberToHuman(calculator.netIncome));
    // Deductions end here

    // Employer deductions
    $('.skills-dev').text(numberToHuman(calculator.taxOnMisc(calculator.income, calculator.SKILLSDEVELOPMENT)));
    $('.ss-employer').text(numberToHuman(calculator.employerSocialDeductions));
    $('.workers-comp').text(numberToHuman(calculator.taxOnMisc(calculator.income, calculator.WORKERSCOMPENSATION)));
    $('.total-deductions').text(numberToHuman(calculator.totalEmployerDeductions()));

    //Employer deductions end here

    $('.calc-result').fadeIn(1000);
    $('#tax-amount').val("");

  });
})
