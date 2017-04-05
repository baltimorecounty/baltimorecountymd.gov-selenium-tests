const webdriver = require('selenium-webdriver'),
	chai = require('chai'),
	expect = chai.expect,
    By = webdriver.By,
    until = webdriver.until,
	stagingUrl = 'http://staging.baltimorecountymd.gov/CitySourced/preview/reporter';

describe('CitySourced reporter', () => {

	describe('Can submit a report with a specific location', () => {
		
		let driver, categories1, categories2, categories3, description, address, addressSearch, firstName, lastName, email, deviceNumber, fileReportButton;

		before(() => {
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

		});

		afterEach(function() {
			driver.quit();
		});

		it('can submit a report', (done) => {

			categories1.findElement(By.css('option:nth-child(2)')).click().then(() => {
				categories2 = driver.wait(until.elementLocated(By.id('categories[2]')), 2000);
				categories2.findElement(By.css('option:nth-child(2)')).click();
			});

			description.sendKeys('This is a sample description. Do not be alarmed by how samply it is.');

			address.sendKeys('400 Washington Ave, Towson, MD 21204');

			addressSearch.click().then(() => {
				driver.sleep(1000);

				firstName.sendKeys('Selenium');
				lastName.sendKeys('Automation');
				email.sendKeys('mxsnyder@baltimorecountymd.gov');
				deviceNumber.sendKeys('4108871521');

				fileReportButton.click().then(() => {
					driver.findElement(By.css('.bc-citysourced-reporter-alert.alert-success h2')).then((successMessage) => {
						driver.wait(until.elementIsVisible(successMessage), 10000).then((element) => {
							element.getText().then((actual) => {						
								expect(actual).to.equal('Your Submission Has Been Received', 'Success messge not visible.');
								done();
							});
						});
					});
				});
			});			
		});
	});
	
});