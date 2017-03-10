const webdriver = require('selenium-webdriver'),
	fs = require('fs'),
	_ = require('lodash'),
	flatten = require('flat'),
	util = require('util'),
	jsonTools = require('../../../../utility/jsonTools'),
	categoryJson = require('../../../../data/categories.json'),
    By = webdriver.By,
    until = webdriver.until,
	stagingUrl = 'http://staging.baltimorecountymd.gov/CitySourced/preview/reporter';

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
}

describe('CitySourced reporter', () => {

	describe('Can submit a report with a random location', () => {
		
		let driver, testTitle,
			categoryData, categoryLeaves, categoryIndex = 0, categoryPath, flattenedCategories, categoryId,
			categories1, categories2, categories3, description, address, addressSearch, firstName, lastName, email, deviceNumber, fileReportButton;
		
		categoryLeaves = getCategoryLeaves(categoryJson);
		flattenedCategories = _.flattenDeep(categoryLeaves);

		beforeAll(() => {
			driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();			
		});

		beforeEach(() => {
			driver.get(stagingUrl);

			categories1 = driver.findElement(By.id('categories[1]'));
			description = driver.findElement(By.id('description'));
			address = driver.findElement(By.id('address'));
			addressSearch = driver.findElement(By.id('addressSearch'));
			map = driver.findElement(By.id('map'));
			firstName = driver.findElement(By.id('firstName'));
			lastName = driver.findElement(By.id('lastName'));
			email = driver.findElement(By.id('email'));
			deviceNumber = driver.findElement(By.id('deviceNumber'));
			fileReportButton = driver.findElement(By.id('fileReportButton'));	

			categoryId = flattenedCategories[categoryIndex];
			categoryPath = _.flattenDeep(jsonTools.getSubtreePath(categoryJson, 'id', 'types', categoryId));
			categoryIndex++;
		});

		afterAll(function() {
			driver.quit();
		});

		_.forEach(flattenedCategories, (category) => {

			it('Can submit a report for ' + category, (done) => {

				categories1.findElement(By.css('option[value="' + categoryPath[0] + '"]')).click().then(() => {
					if (categoryPath[1]) {
						driver.findElement(By.id('categories[2]')).then((categories2) => {
							categories2.findElement(By.css('option[value="' + categoryPath[1] + '"]')).click().then(() => {
								if (categoryPath[2]) {
									driver.findElement(By.id('categories[3]')).then((categories3) => {
										categories3.findElement(By.css('option[value="' + categoryPath[2] + '"]')).click();
									});
								}
							});			
						});
					}
				});

				description.sendKeys('This is a sample description. Do not be alarmed by how samply it is.');

				
				address.click();
				description.click();

				let clickTheMap = () => {
					map.getSize().then((size) => {
						const clickX = Math.floor(Math.random() * size.width),
							clickY = Math.floor(Math.random() * size.height);
						
						driver.actions()
							.mouseMove(map, {x : clickX, y: clickY})
							.click()
							.perform();
					});
				};
				
				clickTheMap();

				driver.sleep(1000);

				address.getAttribute('value').then((value) => {
					if (!value) {
						clickTheMap();
					}
				});	

				address.getAttribute('value').then((value) => {
					if (!value) {
						clickTheMap();
					}
				});	

				address.getAttribute('value').then((value) => {
					if (!value) {
						clickTheMap();
					}
				});	

				driver.sleep(1000);

				firstName.sendKeys('Selenium');
				lastName.sendKeys('Automation');
				email.sendKeys('mxsnyder@baltimorecountymd.gov');
				deviceNumber.sendKeys('4108871521');

				fileReportButton.click().then(() => {
					driver.findElement(By.css('.bc-citysourced-reporter-alert.alert-success h2')).then((successMessage) => {
						driver.wait(until.elementIsVisible(successMessage), 10000).then((element) => {
							element.getText().then((actual) => {						
								expect(actual).toEqual('Your Submission Has Been Received', 'Success messge not visible.');
								done();
							});
						});
					});
				});
			});
		});
	});	
});