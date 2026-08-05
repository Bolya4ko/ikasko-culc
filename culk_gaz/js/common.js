"use strict";

/* ==========================================================
				 Data loader
========================================================== */

const Data = {

	cache: {},

	async load(name) {

		if (!name) {

			console.error("Data.load(): не вказано ім'я файлу");
			return null;

		}

		if (this.cache[name]) {

			return this.cache[name];

		}

		try {

			const response = await fetch(`data/${name}.json`, {
				cache: "no-cache"
			});

			if (!response.ok) {

				throw new Error(
					`Помилка ${response.status}: ${name}.json не знайдено`
				);

			}

			const json = await response.json();

			if (!json || typeof json !== "object") {

				throw new Error(
					`${name}.json має неправильний формат`
				);

			}

			this.cache[name] = json;

			console.log(`✔ ${name}.json завантажено`);

			return json;

		} catch (error) {

			console.error(`Data loader: ${error.message}`);

			return null;

		}

	},

	clear(name) {

		delete this.cache[name];

	},

	clearCache() {

		this.cache = {};

	}
};