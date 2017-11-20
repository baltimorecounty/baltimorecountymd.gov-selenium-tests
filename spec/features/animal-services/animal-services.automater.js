const webdriver = require('selenium-webdriver');

const By = webdriver.By;

const listSelector = '.list-container .pet';

function Automater(driver) {
	const self = this;
	self.driver = driver;

	/**
	 * Public Methods
	 */
	function getList(petStatus, petType) {
		const bySelector = getListSelector(petStatus, petType);
		return new Promise((resolve, reject) => {
			if (petType) {
				return clickTab(buildTabSelector(petStatus, petType))
					.then(() => {
						setTimeout(() => {
							getListElms(bySelector)
								.then((elms) => {
									resolve(elms);
								})
								.catch(reject);
						}, 2500);
					})
					.catch(reject);
			}

			return getListElms(bySelector)
				.then(resolve)
				.catch(reject);
		});
	}

	/**
	 * Private Methods
	 */
	function buildTabSelector(petStatus, type) {
		if (petStatus.toLowerCase().indexOf('adopt') > -1) {
			return `.blog-tabs .adoptable-${type}`;
		}
		return `.blog-tabs .lost-${type}`;
	}

	function clickTab(targetTab) {
		return new Promise((resolve, reject) =>
			driver.findElement(By.css(targetTab))
				.then((elm) => {
					elm.click()
						.then(resolve)
						.catch(reject);
				}));
	}

	function getAnimalSelector(petStatus, type) {
		if (petStatus.toLowerCase().indexOf('adopt') > -1) {
			if (type === 'dog') {
				return "//span[contains(text(), 'Dog')]";
			}
			return "//span[contains(text(), 'Cat')]";
		}
		if (type === 'dog') {
			return "//p[contains(text(), 'Dog')]";
		}
		return "//p[contains(text(), 'Cat')]";
	}

	function getListElms(bySelector) {
		return new Promise((resolve, reject) => {
			driver.findElements(bySelector)
				.then((list) => {
					resolve(list);
				})
				.catch(reject);
		});
	}

	function getListSelector(status, type) {
		const petType = type ? type.toLowerCase() : '';
		const isCatOrDog = petType.indexOf('dog') > -1 || petType.indexOf('cat') > -1;
		if (isCatOrDog) {
			const selector = getAnimalSelector(status, type);
			return By.xpath(selector);
		}
		return By.css(listSelector);
	}

	/**
	 * Export Public methods
	 */
	self.getList = getList;
}

module.exports = Automater;
