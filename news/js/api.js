const API_URL = "https://ikasko-news-engine.onrender.com/api/news";

export async function getNews() {
	const response = await fetch(API_URL);

	if (!response.ok) {
		throw new Error("Не вдалося отримати новини");
	}

	return await response.json();
}