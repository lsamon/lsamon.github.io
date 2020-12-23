import TaxCalculator from './TaxCalculator.js';

let taxCalculator = new TaxCalculator();
const workersCompensation = 0.01;
const skillsDevelopment = 0.05;

document.querySelector('#tax-amount').addEventListener('blur', () => {
  const el = document.querySelector('#tax-amount');
  let grossIncome = el.value == '' ? 0 : parseInt(el.value);
  taxCalculator.grossIncome = grossIncome;
});

document.querySelectorAll('.radio').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.radio').forEach((button) => { button.classList.remove('clicked') });
    item.classList.add('clicked');
    taxCalculator.employeeDeductions = parseFloat(item.dataset.employeeDeductions);
    taxCalculator.employerDeductions = parseFloat(item.dataset.employerDeductions);
    taxCalculator.socialSecurityDeducation = parseFloat(item.dataset.socialSecurityDeducation);

    console.log(taxCalculator.employeeDeductions);
  });
});

document.querySelector('#calculate-tax').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.calc-result').classList.remove('hidden');
  document.querySelector('.base-income').textContent = taxCalculator.grossIncome;
  document.querySelector('.tax-on-income').textContent = taxCalculator.payE();
  document.querySelector('.ss-employee').textContent = taxCalculator.otherDeductions(taxCalculator.employeeDeductions);
  document.querySelector('.total-employee-deductions').textContent = taxCalculator.totalEmployeeDeductions();
  document.querySelector('.net-income').textContent = taxCalculator.netIncome();

  // Employer deductions
  document.querySelector('.skills-dev').textContent = taxCalculator.otherDeductions(skillsDevelopment);
  document.querySelector('.ss-employer').textContent = taxCalculator.otherDeductions(taxCalculator.socialSecurityDeducation);
  document.querySelector('.workers-comp').textContent = taxCalculator.otherDeductions(workersCompensation);
  document.querySelector('.total-deductions').textContent = parseInt(taxCalculator.totalEmployerDeductions(workersCompensation, skillsDevelopment));
});

document.querySelector('#clear-values').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('.radio').forEach((button) => { button.classList.remove('clicked') });
  document.querySelector('.calc-result').classList.add('hidden');
  document.querySelector('#tax-amount').value = '';
});