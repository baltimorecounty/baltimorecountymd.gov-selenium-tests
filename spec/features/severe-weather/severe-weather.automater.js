const webdriver = require('selenium-webdriver');
const seleniumProxy = require('../../selenium-proxy');

const By = webdriver.By;

const SevereWeatherAutomater = (options) => {
	let state = {
		options,
	};

	let helpers = () => {
		return {
			getTableElm: async () => await state.driver.findElement(By.css(state.options.tableSelector)),
			getTableRows: async () => await state.driver.findElements(By.css(state.options.tableRowSelector))
		};
	}

	return Object.assign(
		{},
		seleniumProxy(state),
		helpers(state)
	);
};

module.exports = SevereWeatherAutomater;
