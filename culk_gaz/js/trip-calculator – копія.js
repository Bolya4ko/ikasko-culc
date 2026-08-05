/* ==========================================================
	 Trip Calculator
	 Версія 1.0
	 iKasko.com.ua
========================================================== */

"use strict";

/* ==========================================================
	 Helpers
========================================================== */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const clearTripButton = $("#clearTrip");
const clearConsumptionButton = $("#clearConsumption");
const toNumber = (value) => {

	const number = parseFloat(value);

	return Number.isFinite(number) ? number : 0;

};

const selectedRadio = (name) => {

	return $(`input[name="${name}"]:checked`)?.value || "";

};

const formatNumber = (value, digits = 1) => {

	return Number(value).toLocaleString("uk-UA", {

		minimumFractionDigits: digits,
		maximumFractionDigits: digits

	});

};

const formatMoney = (value) => {

	return Number(value).toLocaleString("uk-UA", {

		minimumFractionDigits: 2,
		maximumFractionDigits: 2

	}) + " грн";

};

const formatDistance = (value) => {

	return formatNumber(value, 1) + " км";

};

const formatFuel = (value, electric = false) => {

	return formatNumber(value, 2) +

		(electric ? " кВт·год" : " л");

};

/* ==========================================================
	 DOM
========================================================== */

const elements = {

	/* ---------- Trip ---------- */

	tripDistance: $("#tripDistance"),
	tripConsumption: $("#tripConsumption"),
	fuelPrice: $("#fuelPrice"),

	/* ---------- Consumption ---------- */

	fuelUsed: $("#fuelUsed"),
	consDistance: $("#consDistance"),

	/* ---------- Units ---------- */

	consumptionUnit: $("#consumptionUnit"),
	priceUnit: $("#priceUnit"),
	fuelUsedUnit: $("#fuelUsedUnit"),
	averageConsumptionUnit: $("#averageConsumptionUnit"),
	fuelUpdated: $("#fuelUpdated"),
};

/* ==========================================================
	 Result blocks
========================================================== */

const ui = {
	results: {
		distance: $('[data-result="distance"]'),
		fuel: $('[data-result="fuel"]'),
		cost: $('[data-result="cost"]'),
		costKm: $('[data-result="costKm"]'),
		cost100: $('[data-result="cost100"]'),
		/* 		passenger: $('[data-result="passenger"]') */
	}
};

/* ==========================================================
	 Consumption
========================================================== */

const consumption = {};

$$("[data-consumption]").forEach(el => {

	consumption[el.dataset.consumption] = el;

});



/* ==========================================================
	 Tabs
========================================================== */

const tabs = {

	buttons: $$(".tab-button"),
	content: $$(".tab-content")

};

/* ==========================================================
	 Application
========================================================== */

const app = {

	fuelType() {

		return selectedRadio("fuelType");

	},

	consumptionFuelType() {

		return selectedRadio("consFuelType");

	},

	isElectricTrip() {

		return this.fuelType() === "electric";

	},

	isElectricConsumption() {

		return this.consumptionFuelType() === "electric";

	}

};
const state = {

	trip: {},

	consumption: {},

};
let fuelPrices = {};
let fuelLastCheck = 0;
/* ==========================================================
	 UI helpers
========================================================== */

function setText(element, value) {

	if (!element) return;

	element.textContent = value;

}

function resetResults() {

	clearTripResults();

	Object.values(consumption).forEach(el => {

		setText(el, "—");

	});

}

/* ==========================================================
	 Init
========================================================== */

function init() {

	resetResults();

	initializeInterface();

}
/* ==========================================================
	 Tabs
========================================================== */

function switchTab(tabId) {

	tabs.buttons.forEach(button => {

		button.classList.toggle(
			"active",
			button.dataset.tab === tabId
		);

	});

	tabs.content.forEach(tab => {

		tab.classList.toggle(
			"active",
			tab.id === tabId
		);

	});

}

tabs.buttons.forEach(button => {

	button.addEventListener("click", () => {

		switchTab(button.dataset.tab);

	});

});

/* ==========================================================
	 Fuel units
========================================================== */

function updateTripUnits() {

	const type = fuelTypes[app.fuelType()];

	if (!type) return;


	elements.consumptionUnit.textContent =
		type.unit;


	elements.priceUnit.textContent =
		type.priceUnit;

}
const fuelTypes = {

	petrol: {

		unit: "л / 100 км",

		priceUnit: "грн / л"

	},

	diesel: {

		unit: "л / 100 км",

		priceUnit: "грн / л"

	},

	gas: {

		unit: "л / 100 км",

		priceUnit: "грн / л"

	},

	electric: {

		unit: "кВт·год / 100 км",

		priceUnit: "грн / кВт·год"

	}

};
function updateConsumptionUnits() {

	const electric = app.isElectricConsumption();

	elements.fuelUsedUnit.textContent =
		electric
			? "кВт·год"
			: "літрів";

	elements.averageConsumptionUnit.textContent =
		electric
			? "кВт·год / 100 км"
			: "л / 100 км";

}
/* ==========================================================
	 Read state
========================================================== */

function readState() {

	state.trip = {

		distance: toNumber(elements.tripDistance.value),

		consumption: toNumber(elements.tripConsumption.value),

		price: toNumber(elements.fuelPrice.value),

		electric: app.isElectricTrip()

	};

	state.consumption = {

		fuel: toNumber(elements.fuelUsed.value),

		distance: toNumber(elements.consDistance.value),

		electric: app.isElectricConsumption()

	};
}

/* ==========================================================
	 Auto events
========================================================== */

$$("input, select").forEach(element => {

	element.addEventListener("input", () => {

		readState();

		updateTripUnits();

		if (element.name === "fuelType") {

			applyFuelPrice();

		}

		readState();

		updateConsumptionUnits();

		calculateTrip();

		calculateConsumption();
	});

	element.addEventListener("change", () => {

		readState();

		updateTripUnits();

		updateConsumptionUnits();

		calculateTrip();

		calculateConsumption();

	});

});

/* ==========================================================
	 Init UI
========================================================== */

function initializeInterface() {

	readState();

	updateTripUnits();

	updateConsumptionUnits();

	readState();

	calculateTrip();

	calculateConsumption();

}

/* document.addEventListener("DOMContentLoaded", init); */

/* ==========================================================
	 Trip calculator
========================================================== */

function clearTripResults() {

	setText(ui.results.distance, "—");
	setText(ui.results.fuel, "—");
	setText(ui.results.cost, "—");
	setText(ui.results.costKm, "—");
	setText(ui.results.cost100, "—");
}
function calculateTrip() {

	const trip = state.trip;

	/* ---------------------------------------
		 Перевірка
	--------------------------------------- */

	if (
		trip.distance <= 0 ||
		trip.consumption <= 0 ||
		trip.price <= 0
	) {

		clearTripResults();

		return;

	}

	/* ---------------------------------------
		 Загальна відстань
	--------------------------------------- */

	const totalDistance = trip.distance;

	/* ---------------------------------------
		 Необхідно пального
	--------------------------------------- */

	const fuelNeeded =
		(totalDistance * trip.consumption) / 100;

	/* ---------------------------------------
		 Вартість
	--------------------------------------- */

	const totalCost =
		fuelNeeded * trip.price;

	/* ---------------------------------------
		 Вартість 1 км
	--------------------------------------- */

	const costPerKm =
		totalCost / totalDistance;

	/* ---------------------------------------
		 Вартість 100 км
	--------------------------------------- */

	const costPer100 =
		costPerKm * 100;



	state.trip.totalDistance = totalDistance;

	state.trip.fuelNeeded = fuelNeeded;

	state.trip.totalCost = totalCost;

	state.trip.costPerKm = costPerKm;

	state.trip.costPer100 = costPer100;

	/* ---------------------------------------
		 Виведення результатів
	--------------------------------------- */

	setText(
		ui.results.distance,
		formatDistance(totalDistance)
	);

	setText(
		ui.results.fuel,
		formatFuel(
			fuelNeeded,
			trip.electric
		)
	);

	setText(
		ui.results.cost,
		formatMoney(totalCost)
	);

	setText(
		ui.results.costKm,
		formatMoney(costPerKm)
	);

	setText(
		ui.results.cost100,
		formatMoney(costPer100)
	);

	/* ---------------------------------------
		 Підсумок
	--------------------------------------- */

}
/* ==========================================================
		 Consumption calculator
========================================================== */

function clearConsumptionResults() {

	setText(
		consumption.average,
		"—"
	);

}

function calculateConsumption() {

	const data = state.consumption;

	/* ---------------------------------------
			 Перевірка
	--------------------------------------- */

	if (
		data.fuel <= 0 ||
		data.distance <= 0
	) {

		clearConsumptionResults();

		return;

	}

	/* ---------------------------------------
			 Розрахунок
	--------------------------------------- */

	const averageConsumption =
		(data.fuel * 100) / data.distance;

	state.consumption.average =
		averageConsumption;

	/* ---------------------------------------
			 Виведення
	--------------------------------------- */

	setText(

		consumption.average,

		formatNumber(
			averageConsumption,
			2
		)

	);

}


function applyFuelPrice() {
	if (!fuelPrices) return;

	const fuelType = app.fuelType();
	const price = fuelPrices[fuelType] ?? 0;

	console.log("Fuel type:", fuelType);
	console.log("FuelPrices:", fuelPrices);

	if (price === undefined) {
		console.error("Fuel price not found for type:", fuelType);
		return;
	}

	elements.fuelPrice.value = price;

	readState();
	calculateTrip();
	showFuelUpdate();
}

function showFuelUpdate() {

	if (!fuelPrices.updated) return;


	const date = new Date(
		fuelPrices.updated
	);


	setText(
		elements.fuelUpdated,
		"🟢 Оновлено: " +
		date.toLocaleString("uk-UA")
	);

}
async function refreshFuelPrices() {

	const now = Date.now();

	const hours =
		(now - fuelLastCheck) / 1000 / 60 / 60;


	// якщо перевіряли менше 24 год тому
	if (
		fuelLastCheck &&
		hours < appConfig.fuelRefreshHours
	) {

		return;

	}


	const data = await Data.load(
		appConfig.defaultFuelPricesFile
	);


	if (!data) {

		return;

	}


	fuelPrices = data;

	fuelLastCheck = now;


	applyFuelPrice();

	showFuelUpdate();


	console.log(
		"✔ Ціни палива оновлено",
		fuelPrices.updated
	);

}
//*
const appConfig = {

	maxPassengers: 5,

	defaultPassengers: 1,

	defaultFuelPricesFile: "fuel-prices",

	fuelRefreshHours: 24

};
document.addEventListener("DOMContentLoaded", async () => {

	init();

	await refreshFuelPrices();

});

/* 
function showFuelUpdate() {

	if (!fuelPrices.updated) return;


	const date = new Date(
		fuelPrices.updated
	);


	setText(
		elements.fuelUpdated,
		"Оновлено: " +
		date.toLocaleString("uk-UA")
	);

} */

function checkFuelUpdate() {

	if (!fuelPrices.updated) return;


	const updated =
		new Date(fuelPrices.updated);


	const now =
		new Date();


	const hours =
		(now - updated) / 1000 / 60 / 60;


	if (hours > 24) {

		setText(
			elements.fuelUpdated,
			"🟡 Ціни застарілі (" +
			Math.floor(hours) +
			" год)"
		);

	}

}
applyFuelPrice();

showFuelUpdate();

checkFuelUpdate();




setInterval(() => {

	refreshFuelPrices();

}, 60 * 60 * 1000);

/* function clearAll() {

	elements.tripDistance.value = "";
	elements.tripConsumption.value = "";

	// повертаємо актуальну ціну палива
	applyFuelPrice();

	elements.fuelUsed.value = "";
	elements.consDistance.value = "";

	readState();

	clearTripResults();
	clearConsumptionResults();

} */

function clearTrip() {

	elements.tripDistance.value = "";
	elements.tripConsumption.value = "";

	// повернути актуальну ціну пального
	applyFuelPrice();

	readState();

	calculateTrip();

}

function clearConsumption() {

	elements.fuelUsed.value = "";
	elements.consDistance.value = "";

	readState();

	calculateConsumption();

}

clearTripButton?.addEventListener("click", clearTrip);
clearConsumptionButton?.addEventListener("click", clearConsumption);