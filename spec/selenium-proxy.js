const webdriver = require('selenium-webdriver');

const seleniumProxy = (state) => {
	// Setup
	if (!state.driver) {
		state.driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build()
	}
	return {
		get: (url) => state.driver.get(url),
		teardown: () => state.driver.quit(),
	};
};

module.exports = seleniumProxy;
