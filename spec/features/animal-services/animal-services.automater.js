const webdriver = require('selenium-webdriver');

const By = webdriver.By;

const listSelector = '.list-container .pet';

function Automater(driver) {
	const self = this;
	self.driver = driver;

	/**
	 * Public Methods
	 */
	async function getList(petStatus, petType) {
		const bySelector = getListSelector(petStatus, petType);

		if (petType) {
			const initialClick = await clickTab(buildTabSelector(petStatus, petType));
		}

		return await getListElms(bySelector);
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

	async function clickTab(targetTab) {
		const elm = await driver.findElement(By.css(targetTab));
		return await elm.click();
	}

	function getAnimalSelector(petStatus, type) {
		const isAdoptedOrRescued = petStatus.toLowerCase().indexOf('adopt') > -1 || petStatus.toLowerCase().indexOf('rescued') > -1;
		if (isAdoptedOrRescued) {
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

	async function getListElms(bySelector) {
		const listElms = await driver.findElements(bySelector);
		return listElms;
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
