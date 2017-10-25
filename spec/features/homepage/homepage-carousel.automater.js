const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

function Automater(driver) {
    var self = this;
    self.driver = driver;

    const carouselItemSelector = '.carousel .carousel-item';
    const carouselActiveItemImageSelector = carouselItemSelector + '.slick-active img';

    self.getItems = function () {
        return new Promise((resolve, reject) => {
            return driver.findElements(By.css(carouselItemSelector))
                .then(resolve)
                .catch(reject);
        });
    }

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