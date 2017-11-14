const webdriver = require('selenium-webdriver');

const By = webdriver.By;
class Automater {


	constructor(options) {
		const invalidConfigWarning = (msg) => {
			console.error(msg); // eslint-disable-line no-console
		};

		this.driver = options.driver || invalidConfigWarning('please provide a driver');
		this.newStoriesSelector = options.newStoriesSelector || invalidConfigWarning('please provide a selector for new stories, this should be a selector that identifies a specific news story in the feed.');
		this.newStoriesDateSelector = options.newStoriesDateSelector || invalidConfigWarning('please provide a selector for new story date, this should the newstory and then find the date inside of that.');
		this.readMoreSelector = options.readMoreSelector || invalidConfigWarning('please provide a selector for the read more news button');
	}

	getDatesFromStories() {
		const self = this;
		return new Promise((resolve, reject) =>
			self.driver.findElements(By.css(this.newStoriesDateSelector))
				.then((dateElms) => {
					Automater.getDateTextSync(dateElms, (dates) => {
						resolve(dates);
					});
				})
				.catch(reject));
	}

	getReadMoreLink() {
		const self = this;
		return new Promise((resolve, reject) =>
			self.driver.findElements(By.css(this.readMoreSelector))
                .then(resolve)
                .catch(reject));
	}

	getStories() {
		const self = this;
		return new Promise((resolve, reject) =>
			self.driver.findElements(By.css(this.newStoriesSelector))
                .then(resolve)
                .catch(reject));
	}

	// TODO: this should probably be static
	validateDates(dates) { // eslint-disable-line class-methods-use-this
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

	static getDateTextSync(objects, callback) {
		let cntr = 0;
		const dates = [];

		const next = () => {
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
		};
		next();
	}
}

module.exports = Automater;
