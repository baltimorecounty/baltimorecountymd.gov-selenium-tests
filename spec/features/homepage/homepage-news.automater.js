const webdriver = require('selenium-webdriver');

const By = webdriver.By;

function Automater(driver) {
	const self = this;

	const newStoriesSelector = '.news-feed .SESyndicationModule .feedItems li';
	const newStoriesDateSelector = `${newStoriesSelector} .pub-date`;


	/**
	 *  Public Methods
	 */
	function getReadMoreLink() {
		return new Promise((resolve, reject) =>
			driver.findElements(By.css('.news-feed-read-more'))
                .then(resolve)
                .catch(reject));
	}

	function getStories() {
		return new Promise((resolve, reject) =>
			driver.findElements(By.css(newStoriesSelector))
                .then(resolve)
                .catch(reject));
	}

	function getDatesFromStories() {
		return new Promise((resolve, reject) =>
			driver.findElements(By.css(newStoriesDateSelector))
                .then(dateElms => getDateTextSync(dateElms, resolve))
				.catch(reject));
	}

	function validateDates(dates) {
		try {
			const validDates = [];

			dates.forEach((date) => {
				const fullDate = `${date} ${new Date().getFullYear()}`;
				const isValidDate = Date.parse(fullDate);

				if (isValidDate) {
					validDates.push(date);
				}
			});
			return dates.length === validDates.length;
		} catch (ex) {
			return false;
		}
	}
	/**
	 *  Private Methods
	 */
	function getDateTextSync(objects, callback) {
		let cntr = 0;
		const dates = [];

		function next() {
			if (cntr < objects.length) {
				objects[cntr++] // eslint-disable-line no-plusplus
					.getText()
						.then((date) => {
							dates.push(date);
							next();
						});
			} else {
				callback(dates);
			}
		}
		next();
	}

	/**
	 * Export Public methods
	 */
	self.getReadMoreLink = getReadMoreLink;
	self.getStories = getStories;
	self.getDatesFromStories = getDatesFromStories;
	self.validateDates = validateDates;
}

module.exports = Automater;
