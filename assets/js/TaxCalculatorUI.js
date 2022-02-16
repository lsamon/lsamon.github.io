import TaxCalculator from './TaxCalculator.js';
import { even, formatPercentage, formattedNumber, fetchData } from './lib/utils.js';

let taxCalculator = new TaxCalculator();
taxCalculator.taxData = await fetchData('assets/models/taxDetails.json');
const instructionsList = await fetchData('assets/models/instructions.json');

const grossIncome = () => {
  const el = document.querySelector('.real-gross-income');
  return el.value == '' ? 0 : parseInt(el.value);
}

const addCellData = (content, tableRow) => {
  const newTd = document.createElement('td');
  const newText = document.createTextNode(content);

  newTd.appendChild(newText);
  tableRow.appendChild(newTd);
}

const addTableRows = (data, tableDiv) => {
  data.forEach(item => {
    const newTr = document.createElement('tr');
    if(even(item.id)) newTr.classList.add('highlighted');

    addCellData(formattedNumber(item.lowerBand), newTr);
    addCellData(item.upperBand ? formattedNumber(item.upperBand) : '-', newTr);
    addCellData(formatPercentage(item.taxRate), newTr);
    addCellData(formattedNumber(item.extraAmount), newTr);
    tableDiv.appendChild(newTr);
  })
}

const addInstructions = (data, ol) => {
  const li = document.createElement('li');
  const textContent = document.createTextNode(data);

  li.appendChild(textContent);
  ol.appendChild(li);
}

const tableDiv = document.getElementById('custom-table');
addTableRows(taxCalculator.taxData, tableDiv);
const instructionsOl = document.getElementById('instructions-list');
instructionsList.forEach(instruction => addInstructions(instruction.content, instructionsOl));

document.querySelector('#taxable-amount').addEventListener('blur', () => {
  const taxableAmount = document.querySelector('#taxable-amount').value.replace(/,/gi, '');
  document.querySelector('.real-gross-income').value = taxableAmount;
  taxCalculator.grossIncome = grossIncome();
  taxCalculator.originalGrossIncome = grossIncome();
});

document.querySelector('#taxable-amount').addEventListener('keyup', (e) => {
  if (document.querySelector('input#taxable-amount').classList.contains('invalid-input')) {
    document.querySelector('.taxable-amount-invalid').classList.add('hidden');
    document.querySelector('input#taxable-amount').classList.remove('invalid-input');
  }

  let income = document.querySelector('#taxable-amount').value;
  income = income.replace(/,/gi, "");
  income = formattedNumber(income);
  document.querySelector('#taxable-amount').value = income;
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

  document.querySelector('.calc-result').classList.remove('hidden');
  document.querySelector('.base-income').textContent = formattedNumber(grossIncome());
  document.querySelector('.tax-on-income').textContent = formattedNumber(taxCalculator.payE());
  document.querySelector('.ss-employee').textContent = formattedNumber(taxCalculator.otherDeductions(taxCalculator.socialSecurityDeduction));
  document.querySelector('.total-employee-deductions').textContent = formattedNumber(taxCalculator.totalEmployeeDeductions());
  document.querySelector('.net-income').textContent = formattedNumber(taxCalculator.netIncome());

  // Employer deductions
  document.querySelector('.skills-dev').textContent = formattedNumber(taxCalculator.otherDeductions(taxCalculator.skillsDevelopment));
  document.querySelector('.ss-employer').textContent = formattedNumber(taxCalculator.otherDeductions(taxCalculator.socialSecurityDeduction));
  document.querySelector('.workers-comp').textContent = formattedNumber(taxCalculator.otherDeductions(taxCalculator.workersCompensation));
  document.querySelector('.total-deductions').textContent = formattedNumber(parseInt(taxCalculator.totalPayableByEmployer()));
});

document.querySelector('#clear-values').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('.radio').forEach((button) => { button.classList.remove('clicked') });
  document.querySelector('.calc-result').classList.add('hidden');
  document.querySelector('#taxable-amount').value = '';
});
