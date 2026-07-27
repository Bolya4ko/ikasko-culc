/* тарифи на 24.07.2025 */
/* КВ35% */
const prices = {
	europe: {
		car: [1050, 1450, 1950, 3750, 5950, 7900, 9950, 12000, 13950, 14450, 15000, 15800, 16300, 16800],
		car2: [9980, 12050, 16600, 23400, 31150, 39000, 46700, 60000, 68500, 77100, 85650, 94200, 102900, 111500],
		car3: [2850, 3550, 4500, 8300, 11000, 14550, 17500, 21000, 24000, 27000, 30500, 33500, 37000, 39500],
		truck: [2850, 3550, 4500, 8300, 11000, 14550, 17500, 21000, 24000, 27000, 30500, 33500, 37000, 39500],
		motorcycle: [890, 1190, 1690, 3350, 4650, 6350, 7750, 9100, 10380, 11190, 12290, 13280, 13750, 14150],
		trailer: [450, 620, 650, 1100, 1500, 2100, 2500, 3000, 3450, 3900, 4400, 4800, 5300, 5500],
		bus: [9980, 12050, 16600, 23400, 31150, 39000, 46700, 60000, 68500, 77100, 85650, 94200, 102900, 111500]
	},
	moldova: {
		car: [720, 890, 1090, 1490, 1890, 2230, 2470, 2580, 2710, 2880, 2990, 3290, 3800, 3990],
		car2: [1800, 2500, 2900, 5100, 7200, 9500, 11770, 13900, 14100, 15900, 17900, 19800, 20700, 22600],
		car3: [390, 590, 790, 1390, 2050, 2550, 2900, 3190, 3547, 3790, 3970, 4150, 4650, 4800],
		truck: [390, 590, 790, 1390, 2050, 2550, 2900, 3190, 3547, 3790, 3970, 4150, 4650, 4800],
		motorcycle: [380, 530, 590, 1050, 1500, 1940, 2340, 2790, 3300, 3700, 4000, 4200, 4500, 4700],
		trailer: [170, 220, 270, 440, 620, 800, 980, 1130, 1150, 1170, 1200, 1220, 1250, 1290],
		bus: [1800, 2500, 2900, 5100, 7200, 9500, 11770, 13900, 14100, 15900, 17900, 19800, 20700, 22600]
	}
};
/* КВ20% */
const prices2 = {
	europe: {
		car: [853, 1178, 1584, 3047, 4834, 6419, 8084, 9750, 11334, 11741, 12188, 12838, 13244, 13650],
		car2: [8109, 9791, 13488, 19013, 25309, 31688, 37944, 48750, 55656, 62644, 69591, 76538, 83606, 90594],
		car3: [2316, 2884, 3656, 6744, 8938, 11822, 14219, 17063, 19500, 21938, 24781, 27219, 30063, 34563],
		truck: [2316, 2884, 3656, 6744, 8938, 11822, 14219, 17063, 19500, 21938, 24781, 27219, 30063, 34563],
		motorcycle: [723, 967, 1373, 2722, 3778, 5159, 6297, 7394, 8434, 9092, 9986, 10790, 11172, 11497],
		trailer: [326, 450, 471, 798, 1088, 1523, 1813, 2175, 2501, 2828, 3190, 3480, 3843, 3988],
		bus: [8109, 9791, 13488, 19013, 25309, 31688, 37944, 48750, 55656, 62644, 69591, 76538, 83606, 90594]
	},
	moldova: {
		car: [468, 579, 709, 969, 1229, 1450, 1606, 1677, 1762, 1872, 1944, 2139, 2470, 2594],
		car2: [1170, 1625, 1885, 3315, 4680, 6175, 7651, 9035, 9165, 10335, 11635, 12870, 13455, 14690],
		car3: [254, 384, 514, 904, 1333, 1658, 1885, 2074, 2306, 2464, 2581, 2698, 3023, 3120],
		truck: [254, 384, 514, 904, 1333, 1658, 1885, 2074, 2306, 2464, 2581, 2698, 3023, 3120],
		motorcycle: [247, 345, 384, 683, 975, 1261, 1521, 1814, 2145, 2405, 2600, 2730, 2925, 3055],
		trailer: [111, 143, 176, 286, 403, 520, 637, 735, 748, 761, 780, 793, 813, 839],
		bus: [1170, 1625, 1885, 3315, 4680, 6175, 7651, 9035, 9165, 10335, 11635, 12870, 13455, 14690]
	}
};

function calculateInsurance() {
	const region = document.getElementById('region').value;
	const vehicle = document.getElementById('vehicle').value;
	const durationIndex = document.getElementById('duration').selectedIndex;
	const program = document.querySelector('input[name="program"]:checked').value;

	const selectedPrices = program === "1" ? prices : prices2;
	const price = selectedPrices[region][vehicle][durationIndex];

	document.getElementById('result').innerText = `Вартість полісу: ${price} грн.`;
}

const TELEGRAM_BOT_TOKEN = "8256952763:AAEDj4fbABEmeZyIH9uwQ0ss9Qin_Is5n3g";
const TELEGRAM_CHAT_ID = "168363788";

/* const TELEGRAM_BOT_TOKEN = "ТОКЕН_БОТА";
const TELEGRAM_CHAT_ID = "ID_ЧАТУ"; */

document.getElementById("sendBtn").addEventListener("click", function () {
	sendTelegramMessage();
});

function calculateInsurance() {
	const region = document.getElementById('region').value;
	const vehicle = document.getElementById('vehicle').value;
	const durationIndex = document.getElementById('duration').selectedIndex;
	const program = document.querySelector('input[name="program"]:checked').value;

	const selectedPrices = program === "1" ? prices : prices2;
	const price = selectedPrices[region][vehicle][durationIndex];

	document.getElementById('result').innerText = `Вартість полісу: ${price} грн.`;
}

function sendTelegramMessage() {
	const region = document.getElementById('region').options[document.getElementById('region').selectedIndex].text;
	const vehicle = document.getElementById('vehicle').options[document.getElementById('vehicle').selectedIndex].text;
	const duration = document.getElementById('duration').options[document.getElementById('duration').selectedIndex].text;
	const program = document.querySelector('input[name="program"]:checked').value;
	const result = document.getElementById('result').innerText || "Не розраховано";
	const notes = document.getElementById('notes').value.trim();

	let message = `🟢 <b>Калькулятор "Зелена Карта"</b>\n`;
	message += `Програма: ${program}\n`;
	message += `Категорія: ${region}\n`;
	message += `Тип ТЗ: ${vehicle}\n`;
	message += `Термін: ${duration}\n`;
	message += `${result}\n`;
	message += `Нотатки: ${notes || "—"}`;

	const statusEl = document.getElementById("statusMessage");
	statusEl.style.color = "black";
	statusEl.innerText = "⏳ Надсилаю повідомлення...";

	fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			chat_id: TELEGRAM_CHAT_ID,
			text: message,
			parse_mode: "HTML"
		})
	})
		.then(response => response.json())
		.then(data => {
			if (data.ok) {
				statusEl.style.color = "green";
				statusEl.innerText = "✅ Повідомлення успішно надіслано!";
			} else {
				statusEl.style.color = "red";
				statusEl.innerText = "❌ Помилка: " + data.description;
			}
		})
		.catch(error => {
			statusEl.style.color = "red";
			statusEl.innerText = "❌ Помилка з'єднання: " + error;
		});
}