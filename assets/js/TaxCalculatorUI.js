import TaxCalculator from './TaxCalculator.js';

let taxCalculator = new TaxCalculator();
const workersCompensation = 0.01;
const skillsDevelopment = 0.05;

function grossIncome() {
  const el = document.querySelector('#tax-amount');
  return el.value == '' ? 0 : parseInt(el.value);
}

document.querySelectorAll('.radio').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.radio').forEach((button) => { button.classList.remove('clicked') });
    item.classList.add('clicked');
    taxCalculator.employeeDeductions = parseFloat(item.dataset.employeeDeductions);
    taxCalculator.employerDeductions = parseFloat(item.dataset.employerDeductions);
    taxCalculator.socialSecurityDeduction = parseFloat(item.dataset.socialSecurityDeduction);

    let socialSecurityAmount = taxCalculator.otherDeductions(taxCalculator.socialSecurityDeduction);
    taxCalculator.grossIncome = grossIncome() - socialSecurityAmount;
  });
});

document.querySelector('#calculate-tax').addEventListener('click', (e) => {
  e.preventDefault();

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
  document.querySelector('#tax-amount').value = '';
});