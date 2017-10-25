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
                const dateParts = date.split(" ");
                if (dateParts.length === 2) {
                    const month = dateParts[0].trim().toLowerCase();
                    const day = dateParts[1].trim();

                    if (isValidMonth(month) && isValidDay(day)) {
                        validDates.push(date);
                    }
                }
            });

            return dates.length === validDates.length;
        }
        catch (ex) {
            return false;
        }
    }

    function isValidMonth(month) {
        return [
            'january',
            'february',
            'march',
            'april',
            'may',
            'june',
            'july',
            'august',
            'september',
            'october',
            'november',
            'december'].includes(month.toLowerCase());
    }

    function isValidDay(dayStr) {
        try {
            const day = parseInt(dayStr);
            return day > 0 && day <= 31;
        }
        catch (ex) {
            return false;
        }
    }

}

module.exports = Automater;