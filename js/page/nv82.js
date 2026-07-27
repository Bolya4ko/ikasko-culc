const insuranceAmount = document.getElementById('insuranceAmount');
const amountValue = document.getElementById('amountValue');
const result = document.getElementById('result');

function formatNumber(num) {
	return Number(num).toLocaleString('uk-UA');
}

function getSelectedValue(name) {
	return parseFloat(
		document.querySelector(`input[name="${name}"]:checked`).value
	);
}

function updateInsuranceLimits() {

	const selectedAge = document.querySelector('input[name="age"]:checked');
	const group = selectedAge.dataset.group;

	if (group === 'child') {

		insuranceAmount.max = 50000;

		if (parseInt(insuranceAmount.value) > 50000) {
			insuranceAmount.value = 50000;
		}

	} else {

		insuranceAmount.max = 100000;

	}

	amountValue.textContent = formatNumber(insuranceAmount.value);

}

function calculate() {

	const K1 = getSelectedValue('age');
	const K2 = parseFloat(insuranceAmount.value);
	const K3 = getSelectedValue('sport');
	//                  0,83 * 2 * 50000 
	const total = Math.ceil(K1 * K3 * K2) / 100;
	total.toFixed(3)

	result.textContent = formatNumber(total.toFixed(0));

}

insuranceAmount.addEventListener('input', () => {

	amountValue.textContent = formatNumber(insuranceAmount.value);

	calculate();

});

document.querySelectorAll('input').forEach(input => {

	input.addEventListener('change', () => {

		updateInsuranceLimits();
		calculate();

	});

});

updateInsuranceLimits();
calculate();