/* calk trevel */
/* calk trevel */
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const result = document.getElementById("result");
const daysCount = document.getElementById("daysCount");
const daysMessage = document.getElementById("daysMessage");

const COEFFS = {
	base: 1.07,
	euroRate: 48.13, // буде оновлено
	usdRate: 41.34,  // буде оновлено
	factors: {
		30000: [
			{ max: 7, value: 0.64 },
			{ max: 15, value: 0.57 },
			{ max: 30, value: 0.53 },
			{ max: 90, value: 0.44 },
			{ max: 180, value: 0.37 }
		],
		50000: [
			{ max: 7, value: 1.22 },
			{ max: 15, value: 1.2 },
			{ max: 30, value: 0.81 },
			{ max: 90, value: 0.71 },
			{ max: 180, value: 0.66 }
		]
	}
};

// ⚙️ Отримання курсу валют з НБУ з кешуванням
async function fetchRates() {
	try {
		const today = new Date().toISOString().split("T")[0];
		const cached = localStorage.getItem("nbuRates");

		if (cached) {
			const parsed = JSON.parse(cached);
			if (parsed.date === today) {
				COEFFS.euroRate = parsed.euro;
				COEFFS.usdRate = parsed.usd;
				console.log("Курси з кешу:", COEFFS.euroRate, COEFFS.usdRate);
				return;
			}
		}

		const response = await fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json");
		const data = await response.json();

		const euro = data.find(item => item.cc === "EUR");
		const usd = data.find(item => item.cc === "USD");

		if (euro && usd) {
			COEFFS.euroRate = euro.rate;
			COEFFS.usdRate = usd.rate;

			localStorage.setItem("nbuRates", JSON.stringify({
				date: today,
				euro: euro.rate,
				usd: usd.rate
			}));

			console.log("Курси оновлено:", COEFFS.euroRate, COEFFS.usdRate);
		}
	} catch (err) {
		console.error("Помилка отримання курсу:", err);
	}
}

document.querySelectorAll("input").forEach(el => {
	el.addEventListener("input", calculate);
});

function calculate() {
	if (!startDate.value || !endDate.value) return;

	const start = new Date(startDate.value);
	const end = new Date(endDate.value);
	const diffDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

	if (diffDays < 2 || diffDays > 180) {
		daysMessage.textContent = "Максимальний термін страхування 180 днів. Мінімум — 2 дні.";
		result.textContent = "Вартість полісу: 0 грн";
		daysCount.textContent = "Кількість днів: 0";
		return;
	}

	daysMessage.textContent = "";
	daysCount.textContent = `Кількість днів: ${diffDays}`;

	const sum = document.querySelector('input[name="sum"]:checked').value;
	const zone = parseFloat(document.querySelector('input[name="zone"]:checked').value);
	const age = parseFloat(document.querySelector('input[name="age"]:checked').value);

	const coeffList = COEFFS.factors[sum];
	let coeff = 0;
	for (let c of coeffList) {
		if (diffDays <= c.max) {
			coeff = c.value;
			break;
		}
	}

	const basePrice = diffDays * coeff;
	const currency = document.querySelector('input[name="currency"]:checked').value;
	const rate = currency === "usd" ? COEFFS.usdRate : COEFFS.euroRate;
	const finalPrice = Math.round(basePrice * zone * age * COEFFS.base * rate);

	result.textContent = `Вартість полісу: ${finalPrice} грн`;
}

document.getElementById("sendTelegram").addEventListener("click", () => {
	if (!startDate.value || !endDate.value) return;

	const sum = document.querySelector('input[name="sum"]:checked').value;
	const zoneLabel = document.querySelector('input[name="zone"]:checked').parentElement.innerText.trim();
	const ageLabel = document.querySelector('input[name="age"]:checked').parentElement.innerText.trim();
	const days = daysCount.textContent.replace("Кількість днів: ", "");
	const cost = result.textContent.replace("Вартість полісу: ", "");
	const note = document.getElementById("note").value.trim();

	const message = `
🧾 Заявка на страховий поліс:
📅 Дати: ${startDate.value} — ${endDate.value}
📆 ${days} днів
💰 Сума: ${sum}
🌍 Зона покриття: ${zoneLabel}
👤 Вік: ${ageLabel}
💸 Вартість: ${cost}
📝 Нотатка: ${note || "немає"}
  `.trim();

	const token = "ВАШ_ТОКЕН"; // заміни!
	const chatId = "ВАШ_CHAT_ID"; // заміни!
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

// 🚀 При старті сторінки підтягнемо курси
fetchRates();

/* calk trevel */
/* calk trevel */