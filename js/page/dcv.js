const tariffs = {
	100000: 250,
	200000: 350,
	300000: 500,
	500000: 700,
	1000000: 1200
};

function calculate() {
	const sum = document.getElementById('sum').value;
	const resultEl = document.getElementById('result');

	if (sum && tariffs[sum]) {
		resultEl.textContent = `Вартість полісу: ${tariffs[sum]} грн`;
	} else {
		resultEl.textContent = 'Вартість полісу: - грн';
	}
}