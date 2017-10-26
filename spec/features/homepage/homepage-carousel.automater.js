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

    self.isCarouselBehindSearch = function () {
        return new Promise((resolve, reject) => {
            return getCssValueBySelector(carouselSelector, 'z-index')
                .then((carouselZIndex) => {
                    carouselZIndex = carouselZIndex === 'auto' ? 0 : carouselZIndex;

                    return getCssValueBySelector(searchControlSelector, 'z-index')
                        .then((searchControlZIndex) => {
                            const isCarouselBehindSearch = carouselZIndex < searchControlZIndex;
                            resolve(isCarouselBehindSearch);
                        })
                        .catch(reject);
                })
                .catch(reject);
        });
    };

    function hoverOverElm(elm) {
        return driver.actions().mouseMove(elm).perform();
    }

    self.isCarouselPaused = function (delay) {
        return new Promise((resolve, reject) => {
            return driver.findElement(By.css(carouselSelector))
                .then(hoverOverElm)
                .then(getActiveImgSrc)
                .then((src) => {
                    setTimeout(() => {
                        return getActiveImgSrc()
                            .then((newSrc) => {
                                const isCarouselPaused = src === newSrc;
                                resolve(isCarouselPaused);
                            })
                            .catch(reject);
                    }, delay);
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

/**
 * Returns a Promise with css value as a string?
 * @param {*} elm 
 * @param {*} prop 
 */
function getCssValueByElement(elm, prop) {
    return elm.getCssValue(prop);
}

function getCssValueBySelector(selector, prop) {
    return getSingleElement(selector)
        .then((elm) => getCssValueByElement(elm, prop));
}

}

module.exports = Automater;