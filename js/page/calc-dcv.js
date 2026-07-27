
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

document.getElementById("sendTelegram").addEventListener("click", () => {
    const sum = document.getElementById("sum").value;
    const sumLabel = sum ? `${Number(sum).toLocaleString('uk-UA')} грн` : "не вибрано";
    const cost = tariffs[sum] ? `${tariffs[sum]} грн` : "- грн";
    const note = document.getElementById("note").value.trim();

    if (!sum || !tariffs[sum]) {
        document.getElementById("telegramStatus").textContent = "❌ Спочатку виберіть страхову суму.";
        return;
    }

    const message = `
🧾 Заявка на ДЦВ:
💰 Страхова сума: ${sumLabel}
💸 Вартість полісу: ${cost}
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
    .then(msg => {
        let status = document.getElementById("telegramStatus");
        if (!status) {
            status = document.createElement("p");
            status.id = "telegramStatus";
            document.querySelector(".section").appendChild(status);
        }
        status.textContent = msg;
    })
    .catch(err => document.getElementById("telegramStatus").textContent = "❌ Помилка з'єднання");
});