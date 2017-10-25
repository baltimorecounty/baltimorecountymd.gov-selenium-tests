const webdriver = require('selenium-webdriver');
const By = webdriver.By;
const until = webdriver.until;

function Automater(driver) {
    var self = this;
    self.driver = driver;

    const newStoriesSelector = '.news-feed .SESyndicationModule .feedItems li';
    const newStoriesDateSelector = newStoriesSelector + ' .pub-date';

    function getDateTextSync(objects, callback) {
        var cntr = 0;
        let dates = [];

        function next() {
            if (cntr < objects.length) {
                objects[cntr++].getText()
                    .then((date) => {
                        dates.push(date);
                        next();
                    });
            }
            else {
                callback(dates);
            }
        }
        next();
    }

    self.getReadMoreLink = function () {
        return new Promise(function (resolve, reject) {
            return driver.findElements(By.css('.news-feed-read-more'))
                .then(resolve)
                .catch(reject);
        });
    };

    self.getStories = function () {
        return new Promise(function (resolve, reject) {
            return driver.findElements(By.css(newStoriesSelector))
                .then(resolve)
                .catch(reject);
        });
    };

    self.getDatesFromStories = function () {
        return new Promise(function (resolve, reject) {
            return driver.findElements(By.css(newStoriesDateSelector))
                .then((dateElms) => {
                    getDateTextSync(dateElms, (dates) => {
                        resolve(dates);
                    })
                })
                .catch(reject);
        });
    }

    self.validateDates = function (dates) {
        try {
            let validDates = [];

            dates.forEach((date) => {
                const fullDate = date + " " + new Date().getFullYear();
                const isValidDate = Date.parse(fullDate);
                
                if (isValidDate) {
                    validDates.push(date);
                }
            });

            return dates.length === validDates.length;
        }
        catch (ex) {
            return false;
        }
    }
}

module.exports = Automater;