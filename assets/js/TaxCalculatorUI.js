import TaxCalculator from './TaxCalculator.js';

let taxCalculator = new TaxCalculator();
const workersCompensation = 0.01;
const skillsDevelopment = 0.05;
let commaPosition = 4;
let taxableAmountArr = [];

function grossIncome() {
  const el = document.querySelector('#taxable-amount');
  return el.value == '' ? 0 : parseInt(el.value);
}

document.querySelector('#taxable-amount').addEventListener('blur', () => {
  taxCalculator.grossIncome = grossIncome();
});

document.querySelector('#taxable-amount').addEventListener('keyup', () => {
  if (document.querySelector('input#taxable-amount').classList.contains('invalid-input')) {
    document.querySelector('.taxable-amount-invalid').classList.add('hidden');
    document.querySelector('input#taxable-amount').classList.remove('invalid-input');
  }
});

document.querySelectorAll('.radio').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.radio').forEach((button) => { button.classList.remove('clicked') });
    item.classList.add('clicked');
    taxCalculator.employeeDeductions = parseFloat(item.dataset.employeeDeductions);
    taxCalculator.employerDeductions = parseFloat(item.dataset.employerDeductions);
    taxCalculator.socialSecurityDeduction = parseFloat(item.dataset.socialSecurityDeduction);
  });
});

document.querySelector('#calculate-tax').addEventListener('click', (e) => {
  e.preventDefault();
  if (document.querySelector('#taxable-amount').value === "") {
    document.querySelector('.taxable-amount-invalid').classList.remove('hidden');
    document.querySelector('input#taxable-amount').classList.add('invalid-input');
    return;
  }

  let socialSecurityAmount = taxCalculator.otherDeductions(taxCalculator.socialSecurityDeduction);
  taxCalculator.grossIncome = taxCalculator.grossIncome - socialSecurityAmount;

  document.querySelector('.calc-result').classList.remove('hidden');
  document.querySelector('.base-income').textContent = grossIncome();
  document.querySelector('.tax-on-income').textContent = taxCalculator.payE();
  document.querySelector('.ss-employee').textContent = taxCalculator.otherDeductions(taxCalculator.socialSecurityDeduction);
  document.querySelector('.total-employee-deductions').textContent = taxCalculator.totalEmployeeDeductions();
  document.querySelector('.net-income').textContent = taxCalculator.netIncome();

  // Employer deductions
  document.querySelector('.skills-dev').textContent = taxCalculator.otherDeductions(skillsDevelopment);
  document.querySelector('.ss-employer').textContent = taxCalculator.otherDeductions(taxCalculator.socialSecurityDeduction);
  document.querySelector('.workers-comp').textContent = taxCalculator.otherDeductions(workersCompensation);
  document.querySelector('.total-deductions').textContent = parseInt(taxCalculator.totalEmployerDeductions(workersCompensation, skillsDevelopment));
  taxCalculator.grossIncome = grossIncome();
});

document.querySelector('#clear-values').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('.radio').forEach((button) => { button.classList.remove('clicked') });
  document.querySelector('.calc-result').classList.add('hidden');
  document.querySelector('#taxable-amount').value = '';
});