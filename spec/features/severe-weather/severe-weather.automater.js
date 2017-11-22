const dateParse = require('date-fns/parse');
const isDateEqual = require('date-fns/is_equal');
var startOfDay = require('date-fns/start_of_day')
const webdriver = require('selenium-webdriver');

const seleniumProxy = require('../../selenium-proxy');

const By = webdriver.By;

/**
 * These values are not currently enforced and is why they are being included statically 
 */
const statuses = [
	'Open',
	'Operating',
	'Closed',
	'See Website',
	'Cancelled',
	'Canceled',
	'Modified',
	'See Website',
];

const helpers = (state) => {
	/**
	 * Private Methods 
	 */
	const getGeneralStatusParts = async () => await state.driver.findElements(By.css(state.options.generalStatusSelector));

	/**
	 * Public Methods
	 */
	const getTableElm = async () => await state.driver.findElement(By.css(state.options.tableSelector));
	const getTableRows = async () => await state.driver.findElements(By.css(state.options.tableRowSelector));
	const isGeneralStatusDateValid = async() => {
		const statusElms = await getGeneralStatusParts();
		const dateText = await statusElms[1].getText();

		if (dateText) {
			const statusDate = dateParse(dateText.toLowerCase().trim());
			const today = new Date();

			// Check the start of each day, we don't care about the time.
			return isDateEqual(startOfDay(statusDate), startOfDay(today));
		}
		return false;
	};
	const isGeneralStatusValid = async () => {
		const statusElms = await getGeneralStatusParts();
		if (statusElms && statusElms.length > 0) {
			const statusElmText = await statusElms[0].getText();
			if (statusElmText) {
				const statusMatches = statuses.filter((status) => statusElmText.toLowerCase().indexOf(status.toLowerCase()) > -1);
				return statusMatches.length > 0;
			}
		}
		return false;
	};
	
	/**
	 * Export Public Methods
	 */
	return {
		getTableElm,
		getTableRows,
		isGeneralStatusDateValid,
		isGeneralStatusValid,
	};	
};

const SevereWeatherAutomater = (options) => {
	let state = {
		options,
	};

	return Object.assign(
		{},
		seleniumProxy(state),
		helpers(state)
	);
};

module.exports = SevereWeatherAutomater;
