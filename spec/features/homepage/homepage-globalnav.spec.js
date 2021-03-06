/* eslint-env mocha */
const webdriver = require('selenium-webdriver');
const chai = require('chai');
const constants = require('./constants');
const Automater = require('./homepage-globalnav.automater');

const expect = chai.expect;

let driver;
let automater;

describe('Homepage - Global Navigation', () => {
	it('Should show the mobile menu icon on screens smaller than 768 pixels', (done) => {
		setWindowSize(driver, 375, 750);
		automater.isMobileNavigationMenuIconVisible()
			.then((isMobileNavigationMenuIconVisible) => {
				expect(isMobileNavigationMenuIconVisible).to.equal(true);
				done();
			})
			.catch(err => handleException(err, done));
	});

	it('Should NOT show the mobile menu icon on screens larger or equal to 768 pixels', (done) => {
		setWindowSize(driver, 900, 750);
		automater.isMobileNavigationMenuIconVisible()
			.then((isMobileNavigationMenuIconVisible) => {
				const isHidden = !isMobileNavigationMenuIconVisible;
				expect(isHidden).to.equal(true);
				done();
			})
            .catch(err => handleException(err, done));
	});

	it('Should show the global nav when the mobile menu icon is clicked if the global nav is hidden', (done) => {
		setWindowSize(driver, 375, 750);
		const numberOfClicks = 1;
		automater.isGlobalNavVisible(numberOfClicks)
			.then((isGlobalNavVisible) => {
				expect(isGlobalNavVisible).to.equal(true);
				done();
			})
            .catch(err => handleException(err, done));
	});

	it('Should hide the global nav when the mobile menu icon is clicked if the global nav is visible', (done) => {
		setWindowSize(driver, 375, 750);
		const numberOfClicks = 2;
		automater.isGlobalNavVisible(numberOfClicks)
			.then((isGlobalNavVisible) => {
				expect(isGlobalNavVisible).to.equal(false);
				done();
			})
            .catch(err => handleException(err, done));
	});

	before(() => {
		driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
		automater = new Automater(driver);
	});

	beforeEach(() => {
		driver.get(constants.url);
	});

	after(() => {
		driver.quit();
	});
});

function setWindowSize(webDriver, width, height) {
	webDriver.manage().window().setSize(width, height);
}

function handleException(err, done) {
	console.log(err); // eslint-disable-line no-console
	const errName = err.name || null;
	expect(errName).to.equal(null);
	done();
}
