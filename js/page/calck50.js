
const k3Data = {
	l0: [
		{ name: "Volkswagen, Honda, Fiat, Peugeot, Volvo, Skoda, Всі марки СНД, Азія, Китай", val: 2.145 },
		{ name: "Всі інші марки ТЗ", val: 1.95 },
		{ name: "Nissan, Kia, Suzuki", val: 1.755 }
	],
	l1: [
		{ name: "Mitsubishi, BMW", val: 1.716 },
		{ name: "Всі інші марки ТЗ", val: 1.56 },
		{ name: "Toyota, Volkswagen, Mercedes-Benz, Skoda, Land Rover, Audi, Nissan, Honda, KIA, Volvo", val: 1.404 }
	],
	l2: [
		{ name: "Porsche, Toyota, BMW", val: 1.344 },
		{ name: "Всі інші марки ТЗ", val: 1.28 },
		{ name: "Volkswagen, Land Rover", val: 1.216 }
	]
};

//function renderK3Options() {
//    const val = document.getElementById("k2").value;
//    const container = document.getElementById("k3-options");
//    container.innerHTML = "";
//    k3Data[val].forEach((opt, i) => {
//        container.innerHTML += `<label><input type="radio" name="k3" value="${opt.val}" ${i===0?"checked":""}> ${opt.name} – тариф ${opt.val}</label>`;
//    });
//}

function renderK3Options() {
	const val = document.getElementById("k2").value;
	const container = document.getElementById("k3-options");
	container.innerHTML = "";
	k3Data[val].forEach((opt, i) => {
		container.innerHTML += `<label><input type="radio" name="k3" value="${opt.val}" ${i === 0 ? "checked" : ""}> ${opt.name}</label>`;
	});
}

function renderK8Options() {
	const year = parseInt(document.getElementById("k6").selectedOptions[0].text);
	const container = document.getElementById("k8-options");
	container.innerHTML = "";
	if (year >= 2021) {
		container.innerHTML = `
            <label><input type="radio" name="k8" value="1" checked> Авторизоване СТО</label>
            <label><input type="radio" name="k8" value="0.9"> Неавторизоване СТО</label>
        `;
	} else {
		container.innerHTML = `
            <label><input type="radio" name="k8" value="1" disabled checked> Авторизоване СТО</label>
            <label><input type="radio" name="k8" value="1"> Неавторизоване СТО</label>
        `;
	}
}

function checkProgram() {
	const program = document.querySelector('input[name="program"]:checked').value;
	const k8Options = document.getElementById("k8-options").querySelectorAll('input[name="k8"]');

	if (program === "imported") {
		// Автоматично вибрати "Неавторизоване СТО" і заблокувати "Авторизоване"
		k8Options.forEach(opt => {
			if (opt.value === "1") {
				opt.disabled = true;
				opt.checked = false;
			}
			if (opt.value !== "1") {
				opt.checked = true;
				opt.disabled = false;
			}
		});
	} else {
		// Розблокувати всі варіанти
		k8Options.forEach(opt => opt.disabled = false);
	}
	calculate();
}


function calculate() {
	let k1 = parseFloat(document.getElementById("k1").value);
	if (isNaN(k1)) { document.getElementById("result").textContent = "Вартість: 0,00 грн"; return; }
	if (k1 < 200000) { document.getElementById("result").textContent = "Занадто дешеве авто"; return; }
	if (k1 > 8000000) { document.getElementById("result").textContent = "Ми не страхуємо ракетоносії"; return; }

	let k3 = parseFloat(document.querySelector('input[name="k3"]:checked').value);
	let k4 = parseFloat(document.getElementById("k4").value);
	let k5 = parseFloat(document.querySelector('input[name="k5"]:checked').value);
	let k6 = parseFloat(document.getElementById("k6").value);
	let k7 = parseFloat(document.querySelector('input[name="k7"]:checked').value);
	let k8 = parseFloat(document.querySelector('input[name="k8"]:checked').value);
	let k9 = 1.115;
	let k10 = parseFloat(document.querySelector('input[name="k10"]:checked').value);

	//let total = Math.round(k1 * k3 * k4 * k5 * k6 * k7 * k8 * k9 / 100);
	let totalKof = (k3 * k4 * k5 * k6 * k7 * k8 * k9 * k10);
	totalKof = Math.ceil(totalKof * 100) / 100
	let total = (k1 * totalKof / 100).toFixed(0);

	console.log(totalKof)

	document.getElementById("result").textContent = `Вартість: ${total.toLocaleString()} грн`;
}

function sendTelegram() {
	let msg = document.getElementById("result").textContent;
	if (msg.includes("0,00") || msg.includes("Занадто") || msg.includes("ракетоносії")) {
		document.getElementById("telegramStatus").textContent = "❌ Спочатку розрахуйте вартість!";
		return;
	}

	let note = document.getElementById("note").value;

	// зчитуємо всі значення
	let k1 = document.getElementById("k1").value; // страхова сума
	let k2 = document.getElementById("k2").selectedOptions[0].text; // вартість ТЗ
	let k3 = document.querySelector('input[name="k3"]:checked')?.parentNode.textContent.trim(); // марка ТЗ
	let program = document.querySelector('input[name="program"]:checked').nextSibling.textContent.trim(); // програма
	let k4 = document.getElementById("k4").selectedOptions[0].text; // франшиза
	let k5 = document.querySelector('input[name="k5"]:checked').nextSibling.textContent.trim(); // франшиза скло
	let k6 = document.getElementById("k6").selectedOptions[0].text; // рік випуску
	let k7 = document.querySelector('input[name="k7"]:checked').nextSibling.textContent.trim(); // вік водіїв
	let k8 = document.querySelector('input[name="k8"]:checked')?.parentNode.textContent.trim(); // СТО

	let message = `
🛡 КАСКО
💰 Страхова сума: ${k1} грн
📊 Вартість ТЗ: ${k2}
🚗 Марка: ${k3}
📋 Програма: ${program}
📉 Франшиза: ${k4}
🔎 Франшиза скло: ${k5}
📅 Рік випуску: ${k6}
👥 Вік водіїв: ${k7}
🏭 СТО: ${k8}

📌 ${msg}
📝 ${note || "немає"}
    `;

	const token = "8256952763:AAEDj4fbABEmeZyIH9uwQ0ss9Qin_Is5n3g"; // заміни!
	const chatId = "168363788";
	fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ chat_id: chatId, text: message })
	})
		.then(res => res.ok ? "✅ Надіслано!" : "❌ Помилка")
		.then(txt => document.getElementById("telegramStatus").textContent = txt)
		.catch(() => document.getElementById("telegramStatus").textContent = "❌ Помилка з'єднання");
}


document.getElementById("k2").addEventListener("change", () => { renderK3Options(); calculate(); });
document.getElementById("k6").addEventListener("change", () => { renderK8Options(); calculate(); });
document.getElementById("k4").addEventListener("change", () => {
	document.getElementById("k5-section").style.display = (document.getElementById("k4").value === "1.2") ? "none" : "block";
	calculate();
});
document.addEventListener("input", calculate);
document.querySelectorAll('input[name="program"]').forEach(radio => {
	radio.addEventListener("change", checkProgram);
});


renderK3Options();
renderK8Options();
checkProgram();

calculate();