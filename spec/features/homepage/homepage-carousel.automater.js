const webdriver = require('selenium-webdriver');

const By = webdriver.By;

function Automater(driver) {
	const self = this;
	self.driver = driver;

	const carouselItemSelector = '.carousel .carousel-item';
	const carouselActiveItemImageSelector = `${carouselItemSelector}.slick-active img`;
	const carouselSelector = '.carousel';
	const searchControlSelector = '#search-container';

	/**
	 *  Public Methods
	 */
	function checkForRotation(rotationInterval) {
		return new Promise((resolve, reject) =>
			getActiveImgSrc()
				.then((src) => {
					setTimeout(() =>
						getActiveImgSrc().then((newSrc) => {
							const isRotating = src !== newSrc;
							resolve(isRotating);
						}), rotationInterval);
				})
				.catch(reject));
	}

	function getItems() {
		return new Promise((resolve, reject) =>
			driver.findElements(By.css(carouselItemSelector))
                .then(resolve)
                .catch(reject));
	}

	function isCarouselBehindSearch() {
		return new Promise((resolve, reject) =>
			getCssValueBySelector(carouselSelector, 'z-index')
				.then(carouselZIndex =>
					getCssValueBySelector(searchControlSelector, 'z-index')
						.then((searchControlZIndex) => {
							const carouselZIndexValue = carouselZIndex === 'auto' ? 0 : carouselZIndex;
							const searchZIndexValue = searchControlZIndex === 'auto' ? 0 : searchControlZIndex;
							const isBehind = carouselZIndexValue < searchZIndexValue;
							resolve(isBehind);
						})
						.catch(reject))
				.catch(reject));
	}

	function isCarouselPaused(delay) {
		return new Promise((resolve, reject) =>
			driver.findElement(By.css(carouselSelector))
				.then(hoverOverElm)
                .then(getActiveImgSrc)
                .then(src => compareImgSrc(src, delay, resolve))
				.catch(reject));
	}

	/**
	 *  Private Methods
	 */
	function compareImgSrc(src, delay, callback) {
		setTimeout(() =>
			getActiveImgSrc()
				.then((newSrc) => {
					const isPaused = src === newSrc;
					callback(isPaused);
				}), delay);
	}

	function getActiveImgSrc() {
		return new Promise((resolve, reject) =>
			driver.findElement(By.css(carouselActiveItemImageSelector))
                .then(elm => elm.getAttribute('src')
                        .then(resolve)
                        .catch(reject))
                .catch(reject));
	}

	function getCssValueByElement(elm, prop) {
		return elm.getCssValue(prop);
	}

	function getCssValueBySelector(selector, prop) {
		return getSingleElement(selector)
            .then(elm => getCssValueByElement(elm, prop));
	}

	function getSingleElement(selector) {
		return new Promise((resolve, reject) =>
			driver.findElement(By.css(selector))
                .then(resolve)
                .catch(reject));
	}

	function hoverOverElm(elm) {
		return driver.actions().mouseMove(elm).perform();
	}

	/**
	 * Export Public methods
	 */
	self.checkForRotation = checkForRotation;
	self.getItems = getItems;
	self.isCarouselBehindSearch = isCarouselBehindSearch;
	self.isCarouselPaused = isCarouselPaused;
}

module.exports = Automater;
