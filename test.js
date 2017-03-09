const citysourcedReporterTests = require('./features/citysourced/reporter'),
	webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    firefox = require('selenium-webdriver/firefox'),
	chromeOptions = new chrome.Options();

chromeOptions.addArguments('--window-size=1300,800');

const driver = new webdriver.Builder().setChromeOptions(chromeOptions)
		.forBrowser('chrome')
		.build();

citysourcedReporterTests.run(driver);
