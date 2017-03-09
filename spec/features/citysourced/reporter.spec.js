const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
	stagingUrl = 'http://staging.baltimorecountymd.gov/CitySourced/preview/reporter';

describe('CitySourced reporter', () => {

	describe('All fields exist', () => {
		
		let driver;

		beforeAll((done) => {
			driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
			driver.get(stagingUrl).then(done);
		});

		afterAll(function(done) {
			driver.quit().then(done);
		});

		it ('should have a visible "categories[1]" field', (done) => {
			const description = driver.findElement(By.id('categories[1]')).then((element) => {
				element.isDisplayed().then((actual) => {
					expect(actual).toEqual(true);
					done();
				})
			});
		});

		it ('should have a visible "description" field', (done) => {
			const description = driver.findElement(By.id('description')).then((element) => {
				element.isDisplayed().then((actual) => {
					expect(actual).toEqual(true);
					done();
				})
			});
		});

		it ('should have a visible "address" field', (done) => {
			const description = driver.findElement(By.id('address')).then((element) => {
				element.isDisplayed().then((actual) => {
					expect(actual).toEqual(true);
					done();
				})
			});
		});

		it ('should have a visible "addressSearch" button', (done) => {
			const description = driver.findElement(By.id('addressSearch')).then((element) => {
				element.isDisplayed().then((actual) => {
					expect(actual).toEqual(true);
					done();
				})
			});
		});

		it ('should have a visible "firstName" field', (done) => {
			const description = driver.findElement(By.id('firstName')).then((element) => {
				element.isDisplayed().then((actual) => {
					expect(actual).toEqual(true);
					done();
				})
			});
		});

		it ('should have a visible "lastName" field', (done) => {
			const description = driver.findElement(By.id('lastName')).then((element) => {
				element.isDisplayed().then((actual) => {
					expect(actual).toEqual(true);
					done();
				})
			});
		});

		it ('should have a visible "email" field', (done) => {
			const description = driver.findElement(By.id('email')).then((element) => {
				element.isDisplayed().then((actual) => {
					expect(actual).toEqual(true);
					done();
				})
			});
		});

		it ('should have a visible "phone" field', (done) => {
			const description = driver.findElement(By.id('deviceNumber')).then((element) => {
				element.isDisplayed().then((actual) => {
					expect(actual).toEqual(true);
					done();
				})
			});
		});

		it ('should have a visible "fileReportButton" button', (done) => {
			const description = driver.findElement(By.id('fileReportButton')).then((element) => {
				element.isDisplayed().then((actual) => {
					expect(actual).toEqual(true);
					done();
				})
			});
		});

	});

	describe('Can submit a report', () => {
		
		let driver, category, description, address, addressSearch, firstName, lastName, email, deviceNumber, fileReportButton;

		beforeEach(() => {
			driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
			driver.get(stagingUrl);

			category = driver.findElement(By.id('categories[1]'));
			description = driver.findElement(By.id('description'));
			address = driver.findElement(By.id('address'));
			addressSearch = driver.findElement(By.id('addressSearch'));
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

			category.findElement(By.css('option:nth-child(2)')).click().then(() => {
				const category2 = driver.wait(until.elementLocated(By.id('categories[2]')), 2000);
				category2.findElement(By.css('option:nth-child(2)')).click();
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