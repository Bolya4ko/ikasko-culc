document.querySelectorAll('input[type=checkbox]').forEach(checkbox => {
	checkbox.addEventListener('change', function() {
			document.getElementById(this.id.replace('Check', 'Amount')).classList.toggle('hidden', !this.checked);
	});
});

function getBaseRate(amount) {
	if (amount <= 50000) return 1.3;
	if (amount <= 1500000) return 1.0;
	if (amount <= 5000000) return 0.9;
	if (amount <= 10000000) return 0.8;
	if (amount <= 25000000) return 0.75;
	if (amount <= 50000000) return 0.7;
	return 0.65;
}

function calculateInsurance() {
	let amount = parseFloat(document.getElementById('insuranceAmount').value) || 0;
	let baseRate = getBaseRate(amount);
	let propertyRate = parseFloat(document.querySelector('input[name=propertyType]:checked')?.value || 0);
	let insuranceCost = amount * baseRate * propertyRate;
	
	let extraCosts = 0;
	const extras = [
			{ id: 'equipment', rate: 0.00382  },
			{ id: 'furniture', rate: 0.00401 },
			{ id: 'computer', rate: 0.00418 },
			{ id: 'goods', rate: 0.00409 },
			{ id: 'glass', rate: 0.025 }
	];
	
	extras.forEach(extra => {
			let checkBox = document.getElementById(extra.id + 'Check');
			let input = document.getElementById(extra.id + 'Amount');
			if (checkBox.checked) {
					let extraAmount = parseFloat(input.value) || 0;
					extraCosts += extraAmount * extra.rate;
			}
	});
	
	let totalCost = insuranceCost + extraCosts;
	document.getElementById('totalCost').textContent = totalCost.toFixed(2);
	document.getElementById('result').classList.remove('hidden');
}