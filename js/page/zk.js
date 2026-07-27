/* тарифи на 24.07.2025 */
/* КВ35% */
		const prices = {
			europe: {
				car: [1300, 1900, 2200, 3950, 5950, 8300, 9500, 12600, 14700, 15250, 15500, 15900, 16300, 16800],
				car2: [6120, 8910, 12440, 18610, 24790, 31050, 37230, 43400, 49580, 55850, 62020, 68200, 74460, 80640],
				car3: [3120, 4300, 4500, 8300, 11000, 14550, 17500, 21000, 24000, 27000, 30500, 33500, 37000, 39500],
				truck: [3120, 4300, 4500, 8300, 11000, 14550, 17500, 21000, 24000, 27000, 30500, 33500, 37000, 39500],
				motorcycle: [890, 1190, 1690, 3350, 4650, 6350, 7750, 9100, 10380, 11190, 12290, 13280, 13750, 14150],
				trailer: [450, 620, 650, 1100, 1500, 2100, 2500, 3000, 3450, 3900, 4400, 4800, 5300, 5500],
				bus: [6120, 8910, 12440, 18610, 24790, 31050, 37230, 43400, 49580, 55850, 62020, 68200, 74460, 80640]
			},
			moldova: {
				car: [890, 1300, 1370, 1860, 2300, 2900, 3250, 3400, 3650, 3900, 4130, 4400, 4600, 4800],
				car2: [1800, 2500, 2900, 5100, 7200, 9500, 11770, 13900, 14100, 15900, 17900, 19800, 20700, 22600],
				car3: [950, 1300, 1500, 2650, 3650, 4860, 5900, 6550, 7020, 7950, 8850, 9800, 10500, 11500],
				truck: [950, 1300, 1500, 2650, 3650, 4860, 5900, 6550, 7020, 7950, 8850, 9800, 10500, 11500],
				motorcycle: [380, 530, 590, 1050, 1500, 1940, 2340, 2790, 3300, 3700, 4000, 4200, 4500, 4700],
				trailer: [330, 450, 490, 650, 800, 1000, 1150, 1300, 1450, 1500, 1550, 1590, 1600, 1650],
				bus: [1800, 2500, 2900, 5100, 7200, 9500, 11770, 13900, 14100, 15900, 17900, 19800, 20700, 22600]
			}
		};
/* КВ20% */
		const prices2 = {
			europe: {
				car: [1056, 1544, 1788, 3209, 4834, 6744, 7719, 10238, 11944, 12391, 12594, 12919, 13244, 13650],
				car2: [4973, 7239, 10108, 15121, 20142, 25228, 30249, 35263, 40284, 45378, 50391, 55413, 60499, 65520],
				car3: [2535, 3494, 3656, 6744, 8938, 11822, 14219, 17063, 19500, 21938, 24781, 27219, 30063, 34563],
				truck: [2535, 3494, 3656, 6744, 8938, 11822, 14219, 17063, 19500, 21938, 24781, 27219, 30063, 34563],
				motorcycle: [723, 967, 1373, 2722, 3778, 5159, 6297, 7394, 8434, 9092, 9986, 10790, 11172, 11497],
				trailer: [326, 450, 471, 798, 1088, 1523, 1813, 2175, 2501, 2828, 3190, 3480, 3843, 3988],
				bus: [4973, 7239, 10108, 15121, 20142, 25228, 30249, 35263, 40284, 45378, 50391, 55413, 60499, 65520]
			},
			moldova: {
				car: [579, 845, 891, 1209, 1495, 1885, 2113, 2210, 2373, 2535, 2685, 2860, 2990, 3120],
				car2: [1170, 1625, 1885, 3315, 4680, 6175, 7651, 9035, 9165, 10335, 11635, 12870, 13455, 14690],
				car3: [618, 845, 975, 1723, 2373, 3159, 3835, 4258, 4563, 4168, 5753, 6370, 6825, 7475],
				truck: [618, 845, 975, 1723, 2373, 3159, 3835, 4258, 4563, 4168, 5753, 6370, 6825, 7475],
				motorcycle: [247, 345, 384, 683, 975, 1261, 1521, 1814, 2145, 2405, 2600, 2730, 2925, 3055],
				trailer: [215, 293, 319, 423, 520, 650, 748, 845, 943, 975, 1008, 1034, 1040, 1073],
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