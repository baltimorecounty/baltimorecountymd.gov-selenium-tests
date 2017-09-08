const webdriver = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');
const jsonTools = require('../../../../utility/jsonTools');
const categoryJson = require('../../../../data/categories.json');
const By = webdriver.By;
const until = webdriver.until;
const stagingUrl = 'http://staging.baltimorecountymd.gov/baltcogo/reporter';

const getCategoryLeaves = (myData) => {
	let list = [];

	_.forEach(myData, (value) => {
		if (value.types) {
			list.push(getCategoryLeaves(value.types));
		} else {
			list.push(value.id);
		}
	});

	return list;
};

describe('CitySourced reporter', () => {
	describe('Can submit a report with a random location', () => {
		let driver;
		let categoryLeaves;
		let categoryIndex = 0;
		let categoryPath;
		let flattenedCategories;
		let categoryId;
		let categories1;
		let description;
		let address;
		let map;
		let firstName;
		let lastName;
		let email;
		let deviceNumber;
		let nextButton;

		categoryLeaves = getCategoryLeaves(categoryJson);
		flattenedCategories = _.flattenDeep(categoryLeaves);

		before(() => {
			driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
		});

		beforeEach(() => {
			driver.manage().window().setSize(1200, 1000);
			driver.get(stagingUrl);

			categories1 = driver.findElement(By.id('categories'));
			description = driver.findElement(By.id('description'));
			address = driver.findElement(By.id('address'));
			map = driver.findElement(By.id('map'));
			firstName = driver.findElement(By.id('firstName'));
			lastName = driver.findElement(By.id('lastName'));
			email = driver.findElement(By.id('email'));
			deviceNumber = driver.findElement(By.id('deviceNumber'));
			nextButton = driver.findElement(By.id('nextButton'));
			categoryId = flattenedCategories[categoryIndex];
			categoryPath = _.flattenDeep(jsonTools.getSubtreePath(categoryJson, 'id', 'types', categoryId));
			categoryIndex += 1;
		});

		after(function () {
			driver.quit();
		});

		_.forEach(flattenedCategories, (category) => {
			it('Can submit a report for ' + category, (done) => {
				// First panel ------ category and description

				categories1.findElement(By.css('option[value="' + categoryPath[0] + '"]')).click().then(() => {
					if (categoryPath[1]) {
						driver.findElement(By.id('subCategories'))
							.then((categories2) => categories2.findElement(By.css('option[value="' + categoryPath[1] + '"]')).click(), () => {});
					}
				});


				driver.findElement(By.id('pet-type')).then((foundElement) => foundElement.findElement(By.css('option:nth-child(2)')).click(), () => { return true; });

				driver.findElement(By.id('pet-sex')).then((foundElement) => foundElement.findElement(By.css('option:nth-child(2)')).click(), () => { return true; });

				driver.findElement(By.id('primary-color')).then((foundElement) => foundElement.findElement(By.css('option:nth-child(2)')).click(), () => { return true; });

				driver.findElement(By.id('primary-breed')).then((foundElement) => foundElement.findElement(By.css('option:nth-child(2)')).click(), () => { return true; });

				driver.findElement(By.id('animalDescription')).then((foundElement) => foundElement.sendKeys('Animal description text.'), () => {});

				description.sendKeys('This is a sample description. Do not be alarmed by how samply it is.');

/* 				driver.wait(until.elementLocated(By.id('nextButton')), 5000);
				driver.wait(until.elementIsVisible(By.id('nextButton')), 5000);
 */				
				driver.findElement(By.id('nextButton')).click();

				// Second panel ------ address and location description

				driver.sleep(1000);

				let clickTheMap = () => {
					map.getSize().then((size) => {
						if (size.width !== 0) {
							const clickX = Math.floor(Math.random() * size.width);
							const clickY = Math.floor(Math.random() * size.height);

							driver.actions()
								.mouseMove(map, { x: clickX, y: clickY })
								.click()
								.perform();
						}
					});
				};

				clickTheMap();

				driver.sleep(1000);

				address.isDisplayed().then((isDisplayed) => {
					if (isDisplayed) {
						address.getAttribute('value').then((value1) => {
							if (!value1) {
								clickTheMap();
								driver.sleep(1000);
							}

							address.getAttribute('value').then((value2) => {
								if (!value2) {
									clickTheMap();
									driver.sleep(1000);
								}

								address.getAttribute('value').then((value3) => {
									if (!value3) {
										clickTheMap();
										driver.sleep(1000);
									}
								});
							});

/* 							driver.wait(until.elementLocated(By.id('nextButton')), 5000);
							driver.wait(until.elementIsVisible(By.id('nextButton')), 5000);
 */
							driver.findElement(By.id('nextButton')).click();
						});
					}
				});

/* 				driver.wait(until.elementLocated(By.id('fileReportButton')), 5000);
				driver.wait(until.elementIsVisible(By.id('fileReportButton')), 5000);
 */
				firstName.sendKeys('Test');
				lastName.sendKeys('Automation');

				// These 4 elements are conditional
				driver.findElement(By.id('streetAddress')).then(foundElement => foundElement.sendKeys('123 Any Street'), () => {});
				driver.findElement(By.id('city')).then(foundElement => foundElement.sendKeys('Towson'), () => {});
				driver.findElement(By.id('state')).then(foundElement => foundElement.sendKeys('MD'), () => {});
				driver.findElement(By.id('zipCode')).then(foundElement => foundElement.sendKeys('21204'), () => {});

				email.sendKeys('mxsnyder@baltimorecountymd.gov');
				deviceNumber.sendKeys('410-887-1521');

				driver.findElement(By.id('fileReportButton')).click().then(() => {
					driver.wait(until.elementLocated(By.css('.bc-citysourced-reporter-alert.alert-success h2')), 10000).then((successMessage) => {
						successMessage.getText().then((actual) => {
							expect(actual).to.equal('Your Submission Has Been Received', 'Success message not visible.');
							done();
						});
					});
				});
			});
		});
	});
});
