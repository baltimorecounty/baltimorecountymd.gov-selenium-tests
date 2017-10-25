const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

function Automater(driver) {
    var self = this;
    self.driver = driver;

    const carouselItemSelector = '.carousel .carousel-item';
    const carouselActiveItemImageSelector = carouselItemSelector + '.slick-active img';
    const carouselSelector = '.carousel';
    const searchControlSelector = '#search-container';

    self.checkForRotation = function (rotationInterval) {
        return new Promise((resolve, reject) => {
            return getActiveImgSrc()
                .then((src) => {
                    setTimeout(() => {
                        return getActiveImgSrc().then((newSrc) => {
                            const isRotating = src !== newSrc;
                            resolve(isRotating);
                        });
                    }, rotationInterval);
                })
                .catch(reject);
        });
    };

    self.getItems = function () {
        return new Promise((resolve, reject) => {
            return driver.findElements(By.css(carouselItemSelector))
                .then(resolve)
                .catch(reject);
        });
    };

    function getSingleElement(selector) {
        return new Promise(function (resolve, reject) {
            return driver.findElement(By.css(selector))
                .then(resolve)
                .catch(reject);
        });
    }

    function getZIndexFromElement(elm) {
        return new Promise((resolve, reject) => {
            return elm.getCssValue('z-index')
                .then(resolve)
                .catch(reject);
        });
    }

    function getCarouselZIndex() {
        return new Promise((resolve, reject) => {
            return getSingleElement(carouselSelector)
                .then(getZIndexFromElement)
                .then(resolve)
                .catch(reject);
        });
    }

    function getSearchControlZIndex() {
        return new Promise((resolve, reject) => {
            return getSingleElement(searchControlSelector)
                .then(getZIndexFromElement)
                .then(resolve)
                .catch(reject);
        });
    }


    self.isCarouselBehindSearch = function () {
        return new Promise((resolve, reject) => {
            return getCarouselZIndex()
                .then((carouselZIndex) => {
                    carouselZIndex = carouselZIndex === 'auto' ? 0 : carouselZIndex;
                    
                    return getSearchControlZIndex()
                        .then((searchControlZIndex) => {
                            const isCarouselBehindSearch = carouselZIndex < searchControlZIndex;
                            resolve(isCarouselBehindSearch);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    };

    function getActiveImgSrc() {
        return new Promise((resolve, reject) => {
            return driver.findElement(By.css(carouselActiveItemImageSelector))
                .then((elm) => {
                    return elm.getAttribute('src')
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject)
        });
    }

}

module.exports = Automater;