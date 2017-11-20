/* eslint-env mocha */
const chai = require('chai');
const constants = require('./constants');
const Automater = require('./daily-docket.automater');

const expect = chai.expect;

let automater;

describe('Daily Docket', () => {
	it('Should show the events table', async () => {
		const doesTableExist = await automater.doesEventsTableExist();
		expect(doesTableExist).to.be.eq(true);
	});

	it('Should show at least 1 event in a table', async () => {
		const numberOfRows = await automater.getNumberOfDocketRows();
		expect(numberOfRows).to.be.gte(1);
	});

	it('Should show filter records', async () => {
		const docketDoesFilter = await automater.docketDoesFilter();
		expect(docketDoesFilter).to.be.eq(true);
	});

	beforeEach(async () => {
		await automater.setup();
	});

	afterEach(() => {
		automater.teardown();
	});

	before(() => {
		automater = new Automater(constants.puppeteerOptions.options);
	});
});