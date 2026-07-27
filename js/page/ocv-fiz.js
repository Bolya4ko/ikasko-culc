const BSP = 2448;

function getValue(name) {
	const checked = document.querySelector(`input[name="${name}"]:checked`);
	return checked ? parseFloat(checked.value) : null;
}

function calculatePolicyCost() {
	const k1 = parseFloat(document.getElementById("pet-select").value);
	const k2 = getValue("k2");
	const k3 = getValue("k3");
	const k4 = getValue("k4");
	const k5 = getValue("k5");
	const k6 = getValue("k6");

	if ([k1, k2, k3, k4, k5, k6].includes(null)) {
		document.getElementById("result").textContent = "—";
		return;
	}

	const result = Math.round(BSP * k1 * k2 * k3 * k4 * k5 * k6);
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
	👤 Вік власника: ${k4Label}
	🎯 Пільгова категорія: ${k5Label}
	📋 Програма: ${k6Label}
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

// Слухаємо зміну "Тип ТЗ" і керуємо доступністю пільг
document.getElementById("pet-select").addEventListener("change", () => {

	const allowedIds = ["b1", "b2", "b3", "b4", "b5"];
	const selectedOption = document.getElementById("pet-select").selectedOptions[0];
	const selectedId = selectedOption.id;

	const k6Radios = document.querySelectorAll('input[name="k6"]');

	if (allowedIds.includes(selectedId)) {

		// Дозволяємо вибір тільки для B1-B5
		k6Radios.forEach(r => {
			r.disabled = false;
		});

	} else {

		// Для всіх інших завжди "Новий клієнт"
		k6Radios.forEach(r => {

			if (r.value === "1") {
				r.checked = true;
				r.disabled = false;
			} else {
				r.disabled = true;
			}

		});
	}

	calculatePolicyCost();
});



// ✅ Новий код для "Програма страхування"
document.querySelectorAll('input[name="k1"]').forEach(input => {
	input.addEventListener('change', () => {
		const allowedProgramValues = ["1.1", "1.37", "1.38", "1.46", "1.66"]; // B1, B2, B3, B4, B5
		const k1Value = document.querySelector('input[name="k1"]:checked')?.value;

		const k6Radios = document.querySelectorAll('input[name="k6"]');

		if (allowedProgramValues.includes(k1Value)) {
			k6Radios.forEach(r => r.disabled = false);
		} else {
			k6Radios.forEach(r => {
				r.disabled = r.value !== "1";
				if (r.value === "1") r.checked = true;
			});
		}

		calculatePolicyCost();
	});
});
// ✅ K5 "Без пільг" завжди вибрано,
// а "З пільгами" доступно тільки для B1, B2, B3, B5
const k5Radios = document.querySelectorAll('input[name="k5"]');
const noBenefits = document.querySelector('input[name="k5"][value="1"]');
const benefits = document.querySelector('input[name="k5"][value="0.5"]');

function updateK5Availability() {

	const selectedOption = document.getElementById("pet-select").selectedOptions[0];
	const selectedId = selectedOption.id;

	const allowedIds = ["b1", "b2", "b3", "b5"];

	if (allowedIds.includes(selectedId)) {

		// дозволяємо вибір пільг
		benefits.disabled = false;
		if (allowedIds.includes(selectedId)) {

			// дозволяємо вибір пільг
			benefits.disabled = false;

			// якщо обрані пільги → автоматично "Новий клієнт"
			if (benefits.checked) {

				const newClient = document.querySelector('input[name="k6"][value="1"]');
				const regularClient = document.querySelector('input[name="k6"][value="0.95"]');

				newClient.checked = true;
				regularClient.disabled = true;
			}

		} else {

			// завжди "Без пільг"
			noBenefits.checked = true;
			benefits.disabled = true;
		}
	} else {

		// завжди "Без пільг"
		noBenefits.checked = true;
		benefits.disabled = true;
	}
}

// запускаємо при зміні типу ТЗ
document.getElementById("pet-select").addEventListener("change", () => {
	updateK5Availability();
	calculatePolicyCost();
});

// запускаємо при завантаженні сторінки
updateK5Availability();

k5Radios.forEach(radio => {
	radio.addEventListener("change", () => {

		const benefitsSelected = benefits.checked;

		const newClient = document.querySelector('input[name="k6"][value="1"]');
		const regularClient = document.querySelector('input[name="k6"][value="0.95"]');

		if (benefitsSelected) {

			newClient.checked = true;
			regularClient.disabled = true;

		} else {

			regularClient.disabled = false;
		}

		calculatePolicyCost();
	});
});