const BSP = 4481;

function getValue(name) {
	const checked = document.querySelector(`input[name="${name}"]:checked`);
	return checked ? parseFloat(checked.value) : null;
}

function calculatePolicyCost() {
	const k1 = parseFloat(document.getElementById("pet-select").value);
	const k2 = getValue("k2");
	const k3 = getValue("k3");


	if ([k1, k2, k3].includes(null)) {
		document.getElementById("result").textContent = "—";
		return;
	}

	const result = Math.round(BSP * k1 * k2 * k3);
	document.getElementById("result").textContent = result;
}

// Додаємо автоматичний перерахунок при зміні input
document.getElementById("pet-select").addEventListener("change", calculatePolicyCost);
document.querySelectorAll('input[type="radio"]').forEach(input => {
	input.addEventListener('change', calculatePolicyCost);
});

document.getElementById("sendTelegram").addEventListener("click", () => {
	const k1Label = document.getElementById("pet-select").selectedOptions[0].textContent.trim();
	const k2Label = document.querySelector('input[name="k2"]:checked')?.parentElement.innerText.trim() || "";
	const k3Label = document.querySelector('input[name="k3"]:checked')?.parentElement.innerText.trim() || "";
	const k4Label = document.querySelector('input[name="k4"]:checked')?.parentElement.innerText.trim() || "";
	const k5Label = document.querySelector('input[name="k5"]:checked')?.parentElement.innerText.trim() || "";
	const k6Label = document.querySelector('input[name="k6"]:checked')?.parentElement.innerText.trim() || "";

	const cost = document.getElementById("result").textContent;
	const note = document.getElementById("note").value.trim();

	if (cost === "—") {
		document.getElementById("telegramStatus").textContent = "❌ Спочатку заповніть форму та розрахуйте вартість.";
		return;
	}

	const message = `
	🧾 Заявка на ОСЦПВ (Фіз. особа):
	🩺 Страхова сума по життю та здоров'ю на одну особу 500 000 грн.
	🔑 Страхова сума по майну на одну особу 250 000 грн.
	🤝 Опція «Пряме врегулювання»
	🚗 Тип ТЗ: ${k1Label}
	📍 Місце реєстрації: ${k2Label}
	🏷 Марка: ${k3Label}
	💸 Вартість полісу: ${cost} грн
	📝 Нотатка: ${note || "немає"}
 	   `.trim();

	const token = "8256952763:AAEDj4fbABEmeZyIH9uwQ0ss9Qin_Is5n3g"; // заміни!
	const chatId = "168363788";  // заміни!
	const url = `https://api.telegram.org/bot${token}/sendMessage`;

	fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			chat_id: chatId,
			text: message,
			parse_mode: "HTML"
		})
	})
		.then(res => res.ok ? "✅ Надіслано!" : "❌ Помилка")
		.then(msg => document.getElementById("telegramStatus").textContent = msg)
		.catch(err => document.getElementById("telegramStatus").textContent = "❌ Помилка з'єднання");
});