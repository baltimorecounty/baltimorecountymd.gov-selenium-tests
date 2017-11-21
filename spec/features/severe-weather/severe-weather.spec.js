/* eslint-env mocha */
const chai = require('chai');
const constants = require('./constants');
const SevereWeatherAutomater = require('./severe-weather.automater');

const expect = chai.expect;

let automater;

let automaterOptions = {
	tableRowSelector: '#county-closings tbody tr',
	tableSelector: '#county-closings',
};
	
describe(`Severe Weather`, () => {
	it('Should display a list of all animals', async () => {
		try {
			const tableElm = await automater.getTableElm();
			const tableExists = !!tableElm;
			expect(tableExists).to.be.eq(true);
		}
		catch (ex) {
			//Table Element could not be found, fail the test.
			handleFailure(`Could not find the table element on the page`, ex);
		}
	});

	it(`Should ${constants.agencyList.length} agency/program rows in the table`, async () => {
		try {
			const tableRows = await automater.getTableRows();
			const numberOfTableRows = tableRows ? tableRows.length : 0;
			const numberOfSupportedAgencies = constants.agencyList.length;

			expect(numberOfTableRows).to.be.eq(numberOfSupportedAgencies);
		}
		catch (ex) {
			//Table Rows could not be found, fail the test.
			handleFailure(`Could not find the table rows on the page`, ex);
		}
	});

	before(() => {
		automater = SevereWeatherAutomater(automaterOptions);
	});

	beforeEach(() => {
		automater.get(constants.url);
	});

	after(() => {
		automater.teardown();
	});
});

function handleFailure(msg, ex) {
	expect.fail(0, 1, msg + `\n\n${ex}`);
}

function handleException(err, done) {
	console.log(err); // eslint-disable-line no-console
	const errName = err.name || null;
	expect(errName).to.equal(null);
	done();
}
