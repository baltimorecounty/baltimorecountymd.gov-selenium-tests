const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

function Automater(driver) {
    var self = this;
    self.driver = driver;

    const mobileNavigationMenuIconSelector = '.hamburger-nav';
    const globalNavigationSelector = '.secondary-nav.secondary-mobile-nav';

    self.isMobileNavigationMenuIconVisible = function () {
        return new Promise((resolve, reject) => {
            return driver.findElement(By.css(mobileNavigationMenuIconSelector))
                .then((elm) => {
                    return elm.isDisplayed()
                        .then((isDisplayed) => {
                            resolve(isDisplayed);
                        });
                })
                .catch(reject);
        });
    }

    self.isGlobalNavVisible = function (numberOfClicks) {
        return new Promise((resolve, reject) => {
            clickMobileMenuSync(numberOfClicks, () => {
                return isGlobalNavVisible()
                    .then((isVisible) => {
                        resolve(isVisible);
                    })
                    .catch(reject);
            });
        });
    }

    function clickMobileMenuSync(iterations, callback) {
        var cntr = 0;

        function next() {
            if (cntr < iterations) {
                cntr++;
                clickMobileMenu()
                    .then((elm) => {
                        elm.click();
                        next();
                    });
            }
            else {
                callback();
            }
        }
        next();
    }

    function isGlobalNavVisible() {
        return new Promise((resolve, reject) => {
            driver.findElement(By.css(globalNavigationSelector))
                .then((elm) => {
                    return elm.isDisplayed()
                        .then((isVisible) => {
                            resolve(isVisible);
                        });
                })
                .catch(reject);
        });
    }

    function clickMobileMenu() {
        return driver.findElement(By.css(mobileNavigationMenuIconSelector));
    }
}

module.exports = Automater;