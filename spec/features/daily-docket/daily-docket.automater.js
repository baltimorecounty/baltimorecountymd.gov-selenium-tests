const puppeteer = require('puppeteer');
const chai = require('chai');
const constants = require('./constants');

let browser;
let page;

const Automater = function (options) {
	const self = this;
	self.options = options || {};

	let browser;
	let page;

	const rowSelector = '#BACO_table tr';
	const inputSelector = '.bc-filter-form-filter';
	const filterRowSelector = `${rowSelector}:not([style*="display:none"]):not([style*="display: none"])`;

	/**
	 * Public Methods
	 */
	async function docketDoesFilter() {
		// Get the number of events when the page is loaded
		const originalNumberOfEvents = await getNumberOfEvents(rowSelector);
	
		// Add a filter that will most likely return results
		const inputHandle = await page.$(inputSelector);
		await inputHandle.type('er');

		//Give the page a chance to filter
		await page.waitFor(250);

		// Get the number of results after the filter
		const filteredNumberOfEvents = await getNumberOfEvents(filterRowSelector);

		return filteredNumberOfEvents < originalNumberOfEvents;
	}

	async function doesEventsTableExist() {
		const doesTableExist = await page.$$eval('#BACO_table.docket', table => table.length);
		return doesTableExist === 1;
	}

	async function getNumberOfDocketRows() {
		return await getNumberOfEvents(rowSelector);
	}

	/**
	 * Private Methods
	 */
	async function getNumberOfEvents(selector) {
		return await page.$$eval(selector, rows => rows.length);
	}

	/**
	 * Generic Methods
	 */
	async function setup() {
		browser = await puppeteer.launch(self.options);
		page = await browser.newPage();
		await page.goto(`${constants.puppeteerOptions.appUrl}`);
	}

	function teardown() {
		browser.close();
	}

	/**
	 * Export Public Methods
	 */
	self.docketDoesFilter = docketDoesFilter;
	self.doesEventsTableExist = doesEventsTableExist;
	self.getNumberOfDocketRows = getNumberOfDocketRows;

	/**
	 * Generic Puppeteer Methods
	 */
	self.setup = setup;
	self.teardown = teardown;
};

module.exports = Automater;
