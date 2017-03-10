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
});