async function loadNewsWidget() {

	const container = document.getElementById("newsWidget");

	try {

		const response = await fetch(
			"https://ТВІЙ-СЕРВЕР/api/news"
		);


		const result = await response.json();

		const news = result.data;


		container.innerHTML = news
			.slice(0, 5)
			.map(item => `

				<article class="news-widget-card">

					<div class="news-source">
						${item.source}
					</div>


					<h3>
						${item.title}
					</h3>


					<p>
						${item.description || ""}
					</p>


					<a 
						href="${item.url}"
						target="_blank">

						Читати →

					</a>

				</article>

			`)
			.join("");


	} catch (error) {

		console.error(
			"Помилка завантаження новин:",
			error
		);

		container.innerHTML =
			"<p>Новини тимчасово недоступні</p>";

	}

}


loadNewsWidget();