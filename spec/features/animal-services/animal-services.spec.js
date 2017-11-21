/* eslint-env mocha */
const webdriver = require('selenium-webdriver');
const chai = require('chai');
const constants = require('./constants');
const Automater = require('./animal-services.automater');

const expect = chai.expect;

let driver;
let automater;

const pagesToTest = [
	constants.urls.adoptAPet,
	constants.urls.lostPets,
	constants.urls.rescuedPets,
];

pagesToTest.forEach((pageInfo) => {
	
	describe(`Animal Services - ${pageInfo.name}`, () => {
		it('Should display a list of all animals', async () => {
			const list = await automater.getList();
			const listIsNotNull = list && list.length > 0;
			expect(listIsNotNull).to.equal(true);
		});

		it('Should display a list of only cats when the "Cat" tab is selected', async () => {
			const list = await automater.getList(pageInfo.name, 'cat');
			const listIsNotNull = list && list.length > 0;
			expect(listIsNotNull).to.equal(true);
		});

		it('Should display a list of only dogs when the "Dog" tab is selected', async () => {
			const list = await automater.getList(pageInfo.name, 'dog');
			const listIsNotNull = list && list.length > 0;
			expect(listIsNotNull).to.equal(true);
		});

		before(() => {
			driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
			automater = new Automater(driver);
		});

		beforeEach(() => {
			driver.get(pageInfo.url);
		});

		after(() => {
			driver.quit();
		});
	});
});

function handleException(err, done) {
	console.log(err); // eslint-disable-line no-console
	const errName = err.name || null;
	expect(errName).to.equal(null);
	done();
}
