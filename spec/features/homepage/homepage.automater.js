const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

function Automater(driver) {
    var self = this;
    self.driver = driver;

    self.getStories = function () {
        new Promise(function (resolve, reject) {
            return driver.findElements(By.css('.news-feed .SESyndicationModule .feedItems li'))
                .then(resolve)
                .catch(reject);
        });

    };

}

module.exports = Automater;