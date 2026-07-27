const sum = document.getElementById('sum');
const sumValue = document.getElementById('sumValue');
const result = document.getElementById('result');
const term = document.getElementById('term');

function format(n) {
	return Number(n).toLocaleString('uk-UA');
}

function get(name) {
	return parseFloat(document.querySelector(`input[name="${name}"]:checked`).value);
}

// ліміти по віку
function updateSumLimit() {

	const age = document.querySelector('input[name="age"]:checked');
	const group = age.dataset.group;

	if (group === 'child') {
		sum.max = 50000;
		if (+sum.value > 50000) sum.value = 50000;
	} else {
		sum.max = 100000;
	}

	sumValue.textContent = format(sum.value);
}

function calculate() {

	const K1 = get('age');
	const K2 = parseFloat(sum.value);
	const K3 = get('sport');
	const K4 = parseFloat(term.value);

	// формула: (K1 * K3 * K4) * K1 / 100
	const total = (K1 * K3 * K4) * K2 / 100;
	//total.toFixed(4)

	result.textContent = total.toFixed(2);
	//result.textContent = Number(total).toFixed(3);

}

sum.addEventListener('input', () => {
	sumValue.textContent = format(sum.value);
	calculate();
});

document.querySelectorAll('input[name="age"]').forEach(i => {
	i.addEventListener('change', () => {
		updateSumLimit();
		calculate();
	});
});

document.querySelectorAll('input[name="sport"]').forEach(i => {
	i.addEventListener('change', calculate);
});

term.addEventListener('change', calculate);

updateSumLimit();
calculate();