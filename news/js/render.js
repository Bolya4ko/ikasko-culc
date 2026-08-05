const PLACEHOLDER =
	"https://placehold.co/800x500/204065/FFFFFF?text=iKasko+News";

export function renderNews(news) {

	const featuredContainer =
		document.getElementById("featuredNews");

	const newsContainer =
		document.getElementById("newsContainer");

	if (!news.length) {

		featuredContainer.innerHTML =
			"<p>Новин поки що немає.</p>";

		newsContainer.innerHTML = "";

		return;

	}

	/* ==========================================================
		 ГОЛОВНА НОВИНА
	========================================================== */

	const featured = news[0];

	featuredContainer.innerHTML = `

		<article class="featured-news">

			<img
				class="featured-image"
				src="${featured.image || PLACEHOLDER}"
				alt="${featured.title}"
				loading="eager"
				onerror="this.src='${PLACEHOLDER}'">

			<div class="featured-content">

				<div class="featured-source">

					${featured.source}

				</div>

				<h2 class="featured-title">

					${featured.title}

				</h2>

				<p class="featured-description">

					${featured.description || ""}

				</p>

				<a
					class="featured-button"
					href="${featured.url}"
					target="_blank"
					rel="noopener">

					Читати новину →

				</a>

			</div>

		</article>

	`;

	/* ==========================================================
		 ІНШІ НОВИНИ
	========================================================== */

	newsContainer.innerHTML = news
		.slice(1)
		.map(item => `

			<article class="news-card">

				<img
					class="news-image"
					src="${item.image || PLACEHOLDER}"
					alt="${item.title}"
					loading="lazy"
					onerror="this.src='${PLACEHOLDER}'">

				<div class="news-body">

					<div class="news-source">

						${item.source}

					</div>

					<h3 class="news-title">

						${item.title}

					</h3>

					<p class="news-description">

						${item.description || ""}

					</p>

					<div class="news-footer">

						<span class="news-date">

							${item.date || ""}

						</span>

						<a
							class="news-link"
							href="${item.url}"
							target="_blank"
							rel="noopener">

							Читати

						</a>

					</div>

				</div>

			</article>

		`)
		.join("");

}