"use strict";

const axios = require("axios");
const cheerio = require("cheerio");


const backupPrices = {

	petrol: 63.00,
	diesel: 60.00,
	gas: 35.00,
	electric: 4.32

};


async function getFuelPrices() {

	try {

		const url =
			"https://index.minfin.com.ua/ua/markets/fuel/";


		const response = await axios.get(url, {

			headers: {
				"User-Agent":
					"Mozilla/5.0"
			}

		});


		const $ = cheerio.load(response.data);

		const text = $("body").text();

		/* 		const gasIndex = text.indexOf("Газ автомобільний"); */
		const gasIndex = text.indexOf("Газ");

		console.log("Позиція Газ:", gasIndex);

		if (gasIndex !== -1) {

			console.log(
				text.substring(
					gasIndex,
					gasIndex + 150
				)
			);

		}

		console.log(
			text.substring(
				gasIndex,
				gasIndex + 80
			)
		);


		function extractPrice(regex) {

			const match = text.match(regex);

			if (!match) {

				return null;

			}

			return Number(
				match[1]
					.replace(",", ".")
			).toFixed(2) * 1;

		}


		const prices = {

			petrol: extractPrice(
				/Бензин А-95(?! преміум)(\d+,\d{2})/
			),

			diesel: extractPrice(
				/Дизельне паливо(\d+,\d{2})/
			),

			gas: extractPrice(
				/Газ.*?(\d+,\d{2})/
			),

			electric: 4.32

		};


		console.log("Отримані ціни:", prices);


		return {

			updated:
				new Date().toISOString(),

			source:
				"minfin.ua",

			...Object.fromEntries(
				Object.entries(prices).map(([key, value]) => [
					key,
					value ?? backupPrices[key]
				])
			)

		};


		console.log("Отримані ціни:", prices);

		console.log(
			"Довжина сторінки:",
			text.length
		);
		console.log(
			"Отримані ціни:",
			prices
		);

		return {

			updated:
				new Date().toISOString(),

			source:
				"minfin.ua",

			...Object.fromEntries(
				Object.entries(prices).map(([key, value]) => [
					key,
					value ?? backupPrices[key]
				])
			)

		};




		const index = text.indexOf("А-95");


		console.log(
			"Позиція А-95:",
			index
		);


		if (index !== -1) {

			console.log(
				text.substring(index - 200, index + 500)
			);

		}


		return backupPrices;


	} catch (error) {

		console.error(
			"⚠ Помилка отримання цін:",
			error.message
		);


		return backupPrices;

	}

}


module.exports = {
	getFuelPrices
};
