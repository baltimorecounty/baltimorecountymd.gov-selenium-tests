/* eslint-env mocha */
const webdriver = require('selenium-webdriver');
const chai = require('chai');
const constants = require('./constants');
const Automater = require('./homepage-news.automater');

const expect = chai.expect;

let driver;
let automater;

describe('Homepage - News Stories', () => {
	it('Should display four news stories', (done) => {
		automater.getStories()
			.then((newStories) => {
				const numberOfStories = newStories.length;
				expect(numberOfStories).to.equal(4);
				done();
			})
			.catch(err => handleException(err, done));
	});

	it("Should display a 'Read More' news link", (done) => {
		automater
			.getReadMoreLink()
				.then((readMoreLink) => {
					const linkExists = readMoreLink && !!readMoreLink.length;
					expect(linkExists).to.equal(true);
					done();
				})
				.catch(err => handleException(err, done));
	});

	it('Should display the data in the following format, {Month DayNumber} ', (done) => {
		automater
			.getDatesFromStories()
				.then((dates) => {
					const hasValidDates = automater.validateDates(dates);
					expect(hasValidDates).to.equal(true);
					done();
				})
				.catch(err => handleException(err, done));
	});

	before(() => {
		driver = new webdriver.Builder()
			.withCapabilities(webdriver.Capabilities.chrome())
			.build();

		automater = new Automater(driver);
	});

	beforeEach(() => {
		driver.get(constants.url);
	});

	after(() => {
		driver.quit();
	});
});

function handleException(err, done) {
	const errName = err.name || null;
	expect(errName).to.equal(null);
	done();
}
