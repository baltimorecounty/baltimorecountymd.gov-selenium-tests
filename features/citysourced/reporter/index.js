const webdriver = require('selenium-webdriver'),
	assert = require('selenium-webdriver/testing/assert'),
    By = webdriver.By,
    until = webdriver.until,
	stagingUrl = 'http://staging.baltimorecountymd.gov/CitySourced/preview/reporter';

const run = (driver) => {

	driver.get(stagingUrl);

	const category = driver.findElement(By.id('categories[1]')),
		description = driver.findElement(By.id('description')),
		address = driver.findElement(By.id('address')),
		addressSearch = driver.findElement(By.id('addressSearch')),
		firstName = driver.findElement(By.id('firstName')),
		lastName = driver.findElement(By.id('lastName')),
		email = driver.findElement(By.id('email')),
		deviceNumber = driver.findElement(By.id('deviceNumber')),
		fileReportButton = driver.findElement(By.id('fileReportButton'));

	category.findElement(By.css('option:nth-child(2)')).click();

	const category2 = driver.wait(until.elementLocated(By.id('categories[2]')), 2000);
	category2.findElement(By.css('option:nth-child(2)')).click();

	description.sendKeys('This is a sample description. Do not be alarmed by how samply it is.');

	address.sendKeys('400 Washington Ave, Towson, MD 21204');
	addressSearch.click().then(() => {
		driver.sleep(2000);

		firstName.sendKeys('Selenium');
		lastName.sendKeys('Automation');
		email.sendKeys('mxsnyder@baltimorecountymd.gov');
		deviceNumber.sendKeys('4108871521');
		
		fileReportButton.click().then(() => {
			driver.findElement(By.css('.bc-citysourced-reporter-alert.alert-success h2')).then((successMessage) => {
				driver.wait(until.elementIsVisible(successMessage), 10000).then((element) => {
					element.getText().then((text) => {						
						const actual = new assert.Assertion(text);
						actual.equalTo('Your Submission Has Been Received', 'Success messge not visible.');
					});
				});
			});
		});
	});
};

module.exports = { run };
