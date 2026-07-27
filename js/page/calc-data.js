function calculateDateDifference() {
	let date1 = new Date(document.getElementById('date1').value);
	let date2 = new Date(document.getElementById('date2').value);
	
	if (!date1 || !date2 || isNaN(date1) || isNaN(date2)) {
			document.getElementById('result').textContent = "Будь ласка, введіть коректні дати";
			return;
	}
	
	if (date1 > date2) {
			[date1, date2] = [date2, date1];
	}
	
	let years = date2.getFullYear() - date1.getFullYear();
	let months = date2.getMonth() - date1.getMonth();
	let days = date2.getDate() - date1.getDate();
	
	if (days < 0) {
			months--;
			let prevMonth = new Date(date2.getFullYear(), date2.getMonth(), 0);
			days += prevMonth.getDate();
	}
	
	if (months < 0) {
			years--;
			months += 12;
	}
	
	document.getElementById('result').textContent = `Різниця між датами: ${years} років, ${months} місяців, ${days} днів`;
}