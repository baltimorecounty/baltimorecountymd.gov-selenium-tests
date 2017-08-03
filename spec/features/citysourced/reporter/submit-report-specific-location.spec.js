const webdriver = require('selenium-webdriver'),
	chai = require('chai'),
	expect = chai.expect,
	By = webdriver.By,
	Key = webdriver.Key,
    until = webdriver.until,
	stagingUrl = 'http://staging.baltimorecountymd.gov/baltcogo/reporter';

describe('CitySourced reporter', () => {

	describe('Can submit a report with a specific location', () => {
		
		let driver, categories1, categories2, description, address, locationDescription, firstName, lastName, streetAddress, city, 
			state, zipCode, email, deviceNumber, nextButton, fileReportButton;

		before(() => {
			driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
		});

		beforeEach(() => {
			driver.manage().window().setSize(1200, 900);
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
		});

		afterEach(function() {
			driver.quit();
		});

		it('can submit a report', (done) => {

			categories1.findElement(By.css('option:nth-child(2)')).click().then(() => {
				categories2 = driver.wait(until.elementLocated(By.id('subCategories')), 2000);
				categories2.findElement(By.css('option:nth-child(2)')).click();
			});

			description.sendKeys('This is a sample description. Do not be alarmed by how samply it is.');

			nextButton.click();

			driver.sleep(1000);

			address.sendKeys('400 Washington Ave, Towson, Md');

			driver.sleep(1000);
			
			address.sendKeys(Key.ENTER);

			driver.sleep(1000);

			locationDescription = driver.findElement(By.id('locationDescription'));
			locationDescription.sendKeys('This is a description of the location.');

			nextButton.click();
			
			driver.sleep(1000);

			// These don't actually exist in the DOM until the panel is displayed
			city = driver.findElement(By.id('city'));
			streetAddress = driver.findElement(By.id('streetAddress'));
			state = driver.findElement(By.id('state'));
			zipCode = driver.findElement(By.id('zipCode'));
			fileReportButton = driver.findElement(By.id('fileReportButton'));

			firstName.sendKeys('Selenium');
			lastName.sendKeys('Automation');
			streetAddress.sendKeys('123 Any Street');
			city.sendKeys('Towson');
			state.sendKeys('MD');
			zipCode.sendKeys('21204');
			email.sendKeys('mxsnyder@baltimorecountymd.gov');
			deviceNumber.sendKeys('410-887-1521');

			fileReportButton.click().then(() => {
				driver.sleep(3000);
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