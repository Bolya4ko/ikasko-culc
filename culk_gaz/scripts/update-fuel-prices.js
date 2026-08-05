"use strict";

const fs = require("fs");
const path = require("path");

const fuelFile = path.join(
	__dirname,
	"../data/fuel-prices.json"
);

const { getFuelPrices } = require("./fuel-source");


async function updateFuel() {

	const prices = await getFuelPrices();

	const data = {

		updated: new Date().toISOString(),

		source: "Minfin",

		...prices

	};


	fs.writeFileSync(
		fuelFile,
		JSON.stringify(data, null, 2),
		"utf8"
	);


	console.log(
		"✔ Ціни пального оновлено:",
		data
	);

}


updateFuel();