const webdriver = require('selenium-webdriver');

const By = webdriver.By;


class Automater {

	constructor(options) {
		const handleError = (msg) => {
			console.error(msg); // eslint-disable-line no-console
		};

		this.driver = options.driver || handleError('');
		this.carouselItemSelector = options.carouselItemSelector || handleError('');
		this.carouselActiveItemImageSelector = options.carouselActiveItemImageSelector || handleError('');
		this.carouselSelector = options.carouselSelector || handleError('');
		this.searchControlSelector = options.searchControlSelector || handleError('');
	}

	checkForRotation(rotationInterval) {
		const self = this;
		return new Promise((resolve, reject) => self.getActiveImgSrc(self)
			.then((src) => {
				setTimeout(() => self.getActiveImgSrc(self)
					.then((newSrc) => {
						const isRotating = src !== newSrc;
						resolve(isRotating);
					}), rotationInterval);
			})
			.catch(reject));
	}

	// eslint-disable-next-line class-methods-use-this
	getActiveImgSrc(automater) {
		return new Promise((resolve, reject) =>
			automater.driver.findElement(By.css(automater.carouselActiveItemImageSelector))
				.then(elm => elm.getAttribute('src')
					.then(resolve)
					.catch(reject))
			.catch(reject));
	}

	static getCssValueByElement(elm, prop) {
		return elm.getCssValue(prop);
	}

	getCssValueBySelector(selector, prop) {
		const self = this;
		return self.getSingleElement(selector)
			.then(elm => Automater.getCssValueByElement(elm, prop));
	}

	getItems() {
		const self = this;
		return new Promise((resolve, reject) =>
			self.driver.findElements(By.css(self.carouselItemSelector))
				.then(resolve)
				.catch(reject));
	}

	getSingleElement(selector) {
		const self = this;
		return new Promise((resolve, reject) =>
			self.driver.findElement(By.css(selector))
				.then(resolve)
				.catch(reject));
	}

	static hoverOverElm(elm, automater) {
		return automater.driver.actions().mouseMove(elm).perform();
	}

	isCarouselBehindSearch() {
		const self = this;
		return new Promise((resolve, reject) =>
			self.getCssValueBySelector(self.carouselSelector, 'z-index')
				.then((carouselZIndex) => {
					const carouselZIndexValue = carouselZIndex === 'auto' ? 0 : carouselZIndex;
					return self.getCssValueBySelector(self.searchControlSelector, 'z-index')
						.then((searchControlZIndex) => {
							const isCarouselBehindSearch = carouselZIndexValue < searchControlZIndex;
							resolve(isCarouselBehindSearch);
						})
						.catch(reject);
				})
				.catch(reject));
	}

	isCarouselPaused(delay) {
		const self = this;
		return new Promise((resolve, reject) =>
			self.driver.findElement(By.css(self.carouselSelector))
				.then(elm => Automater.hoverOverElm(elm, self)
						.then(() => self.getActiveImgSrc(self)
								.then((src) => {
									setTimeout(() =>
										self.getActiveImgSrc(self)
											.then((newSrc) => {
												const isCarouselPaused = src === newSrc;
												resolve(isCarouselPaused);
											})
											.catch(reject), delay);
								})))
				.catch(reject));
	}
}

module.exports = Automater;
