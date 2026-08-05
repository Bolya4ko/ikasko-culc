import { getNews } from "./api.js";
import { renderNews } from "./render.js";

async function init() {

	try {

		const result = await getNews();

		renderNews(result.data);

	} catch (error) {

		console.error(error);

		document.getElementById("featuredNews").innerHTML =
			"<h2>Не вдалося завантажити новини.</h2>";

	}

}

init();