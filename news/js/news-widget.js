const API_URL = "https://ikasko-news-engine.onrender.com/api/news";
const NO_IMAGE = "images/no-image.jpg";

async function loadNewsWidget() {

	try {

		const response = await fetch(API_URL);

		if (!response.ok) {
			throw new Error("Не вдалося отримати новини");
		}

		const { data } = await response.json();

		renderWidget(data.slice(0, 3));

	} catch (error) {

		console.error("News Widget:", error);

	}

}

function renderWidget(news) {

	const featured = document.getElementById("featuredNewsWidget");
	const grid = document.getElementById("newsWidget");

	if (!featured || !grid) return;

	if (!news.length) {

		featured.innerHTML = "<p>Новини відсутні.</p>";
		grid.innerHTML = "";

		return;

	}

	const first = news[0];

	featured.innerHTML = `
		<article class="featured-widget">

			<img
				src="${getImage(first)}"
				alt="${first.title}">

			<div class="featured-widget-content">

				<div class="news-source">
					${first.source}
				</div>

				<h3>${first.title}</h3>

				<p>${truncate(first.description, 150)}</p>

				<a href="news/" class="news-link">
					Читати →
				</a>

			</div>

		</article>
	`;

	grid.innerHTML = "";

	news.slice(1).forEach(item => {

		grid.innerHTML += `
			<a
	href="${item.url}" 
	target="_blank"
	rel="noopener"
	class="widget-card">

	<img
		src="${getImage(item)}"
		alt="${item.title}"
		loading="lazy">

	<div class="widget-content">

		<div class="news-source">
			${item.source}
		</div>

		<h4>${truncate(item.title, 70)}</h4>

	</div>

</a>
		`;

	});

}

function getImage(item) {

	return item.image && item.image.trim()
		? item.image
		: NO_IMAGE;

}

function truncate(text, length = 120) {

	if (!text) return "";

	if (text.length <= length) {
		return text;
	}

	return text.substring(0, length) + "...";

}

loadNewsWidget();