const webdriver = require('selenium-webdriver');

const By = webdriver.By;

function Automater(driver) {
	const self = this;
	self.driver = driver;

	const mobileNavigationMenuIconSelector = '.hamburger-nav';
	const globalNavigationSelector = '.secondary-nav.secondary-mobile-nav';

	/**
	 *  Public Methods
	 */
	function isMobileNavigationMenuIconVisible() {
		return new Promise((resolve, reject) =>
			self.driver.findElement(By.css(mobileNavigationMenuIconSelector))
				.then(elm => elm.isDisplayed()
				.then((isDisplayed) => {
					resolve(isDisplayed);
				}))
                .catch(reject));
	}

	function isGlobalNavVisible(numberOfClicks) {
		return new Promise((resolve, reject) => {
			clickMobileMenuSync(numberOfClicks, () => isNavVisible()
				.then((isVisible) => {
					resolve(isVisible);
				})
				.catch(reject));
		});
	}

	/**
	 *  Private Methods
	 */
	function clickMobileMenuSync(iterations, callback) {
		let cntr = 0;

		function next() {
			if (cntr < iterations) {
				cntr += 1;
				clickMobileMenu()
					.then((elm) => {
						elm.click();
						next();
					});
			} else {
				callback();
			}
		}
		next();
	}

	function isNavVisible() {
		return new Promise((resolve, reject) => {
			driver.findElement(By.css(globalNavigationSelector))
				.then(elm => elm.isDisplayed()
				.then((isVisible) => {
					resolve(isVisible);
				}))
                .catch(reject);
		});
	}

	function clickMobileMenu() {
		return driver.findElement(By.css(mobileNavigationMenuIconSelector));
	}

	/**
	 * Export Public methods
	 */
	self.isGlobalNavVisible = isGlobalNavVisible;
	self.isMobileNavigationMenuIconVisible = isMobileNavigationMenuIconVisible;
}

module.exports = Automater;
