function calculate() {
    let k1 = parseFloat(document.getElementById('k1').value);
    let k2 = parseFloat(document.getElementById('k2').value);
    if (!isNaN(k1) && k1 >= 100000 && k1 <= 8000000) {
        let k3 = k1 * k2;
        document.getElementById('result').innerText = 
            "Вартість страхування: " + k3.toFixed(2) + " грн.";
        return k3;
    } else {
        document.getElementById('result').innerText = 
            "Введіть коректну страхову суму (100000–8000000)";
        return null;
    }
}

document.getElementById('k1').addEventListener('input', calculate);
document.getElementById('k2').addEventListener('change', calculate);

function sendToTelegram() {
    let k1 = document.getElementById('k1').value;
    let k2Text = document.getElementById('k2').options[document.getElementById('k2').selectedIndex].text;
    let result = calculate();
    let notes = document.getElementById('notes').value;

    if (result !== null) {
  const token = "8256952763:AAEDj4fbABEmeZyIH9uwQ0ss9Qin_Is5n3g"; // заміни!
  const chatId = "168363788";  // заміни!
        let message = `КАСКО від військових ризиків\nСтрахова сума: ${k1} грн\nВік ТЗ: ${k2Text}\nВартість страхування: ${result.toFixed(2)} грн\nНотатки: ${notes}`;
        let url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    alert("Дані успішно відправлені в Telegram!");
                } else {
                    alert("Помилка при відправці в Telegram.");
                }
            })
            .catch(() => alert("Помилка з'єднання з Telegram."));
    }
}