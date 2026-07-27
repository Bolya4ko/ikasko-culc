const insuranceAmount = document.getElementById('insuranceAmount');
const amountValue = document.getElementById('amountValue');
const result = document.getElementById('result');

const periodInputs = document.querySelectorAll('input[name="period"]');

const riskGroup1 = document.getElementById('riskGroup1');
const riskGroup2 = document.getElementById('riskGroup2');

function formatNumber(num) {
	return Number(num).toLocaleString('uk-UA');
}

function getSelectedValue(name) {
	return parseFloat(
		document.querySelector(`input[name="${name}"]:checked`).value
	);
}

function calculate() {

	const K1 = parseFloat(insuranceAmount.value);

	let K2;

	const selectedPeriod = document.querySelector('input[name="period"]:checked').value;

	if (selectedPeriod === '24') {
		K2 = getSelectedValue('risk1');
	} else {
		K2 = getSelectedValue('risk2');
	}

	const K3 = getSelectedValue('sport');
	const K4 = getSelectedValue('age');

	const total = ((K2 * K3 * K4) * K1) / 100;

	result.textContent = formatNumber(total.toFixed(0));
}

function toggleRiskGroups() {

	const selectedPeriod = document.querySelector('input[name="period"]:checked').value;

	if (selectedPeriod === '24') {
		riskGroup1.style.display = 'block';
		riskGroup2.style.display = 'none';
	} else {
		riskGroup1.style.display = 'none';
		riskGroup2.style.display = 'block';
	}

	calculate();
}

insuranceAmount.addEventListener('input', () => {
	amountValue.textContent = formatNumber(insuranceAmount.value);
	calculate();
});

document.querySelectorAll('input').forEach(input => {
	input.addEventListener('change', calculate);
});

periodInputs.forEach(input => {
	input.addEventListener('change', toggleRiskGroups);
});

calculate();