const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

function Automater(driver) {
    var self = this;
    self.driver = driver;

    function runSync(objects, callback) {
        var cntr = 0;

        function next() {
            if (cntr < objects.length) {
                objects[cntr++].click().then(next);
            }
            else {
                callback();
            }
        }
        next();
    }

    self.selectAnswer = function (cssSelector) {
        return new Promise((resolve, reject) => {
            return driver.findElements(By.css(cssSelector))
                .then((elms) => {
                    runSync(elms, function () {
                        resolve();
                    });
                })
                .catch(reject);
        });
    }
    self.isReportButtonAvailable = () => {
        return new Promise((resolve, reject) => {
            return driver.findElements(By.xpath("//a[contains(text(), 'File a Report Now')]"))
                .then((submitButton) => resolve(!!submitButton.length))
                .catch(reject);
        });
    };

}

module.exports = Automater;
