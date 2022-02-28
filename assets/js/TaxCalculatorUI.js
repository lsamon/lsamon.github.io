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

document.querySelectorAll('.radio').forEach((item) => {
  item.addEventListener('click', (e) => {
    if (canCalculate()) {
      taxCalculator.socialSecurityDeduction = parseFloat(e.target.value);
      enableButton();
    } else {
      disableButton();
    }
  });
});

const disableButton = () => {
  document.querySelector('#calculate-tax').classList.add('disabled');
  document.querySelector('#calculate-tax').disabled = true;
}

const enableButton = () => {
  document.querySelector('#calculate-tax').classList.remove('disabled');
  document.querySelector('#calculate-tax').disabled = false;
}

const showError = () => {
  document.querySelector('.taxable-amount-invalid').classList.remove('hidden');
  document.querySelector('input#taxable-amount').classList.add('invalid-input');
}

const hideError = () => {
  document.querySelector('.taxable-amount-invalid').classList.add('hidden');
  document.querySelector('input#taxable-amount').classList.remove('invalid-input');
}

const selectedRadioButton = () => {
  const radioButtons = document.querySelectorAll('.radio');

  let selected;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      selected = radioButton.value;
      break;
    }
  }
  return selected;
}

const canCalculate = () => {
  return selectedRadioButton() && document.querySelector('#taxable-amount').value;
}

document.querySelector('#taxable-amount').addEventListener('keyup', (e) => {
  if (canCalculate()) {
    enableButton();
    hideError();
  } else {
    disableButton();
  }
});

document.getElementById('calculate-tax').addEventListener('click', (e) => {
  e.preventDefault();
  if (document.querySelector('#taxable-amount').value === "") return showError();

  document.querySelector('.calc-result').classList.remove('hidden');
  document.querySelector('.base-income').textContent = formattedNumber(grossIncome());
  document.querySelector('.tax-on-income').textContent = formattedNumber(taxCalculator.payE());
  document.querySelector('.ss-employee').textContent = formattedNumber(taxCalculator.otherDeductions(taxCalculator.socialSecurityDeduction));
  document.querySelector('.ss-taxable-income').textContent = formattedNumber(taxCalculator.taxableIncome());
  document.querySelector('.total-employee-deductions').textContent = formattedNumber(taxCalculator.totalEmployeeDeductions());
  document.querySelector('.net-income').textContent = formattedNumber(taxCalculator.netIncome());

  // Employer deductions
  document.querySelector('.skills-dev').textContent = formattedNumber(taxCalculator.otherDeductions(taxCalculator.skillsDevelopment));
  document.querySelector('.ss-employer').textContent = formattedNumber(taxCalculator.socialSecurityEmployerContribution());
  document.querySelector('.workers-comp').textContent = formattedNumber(taxCalculator.otherDeductions(taxCalculator.workersCompensation));
  document.querySelector('.total-deductions').textContent = formattedNumber(parseInt(taxCalculator.totalPayableByEmployer()));
});

document.querySelector('#clear-values').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('.radio').forEach((button) => { button.classList.remove('clicked') });
  document.querySelector('.calc-result').classList.add('hidden');
  document.querySelector('#taxable-amount').value = '';
});
