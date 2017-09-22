const webdriver = require('selenium-webdriver');
//const _ = require('lodash');
const By = webdriver.By;
const until = webdriver.until;

function reporter(driver) {
    var self = this;
    self.driver = driver;

    function chooseAddressByInput(value) {
        let addressInput = self.driver.findElement(By.id('address'));
        let nextButton = self.driver.findElement(By.id('nextButton'));

        addressInput.sendKeys(value);

        self.driver.sleep(1000);

        nextButton.click();
    }

    function chooseReport(category, subCategory, description) {
        let categoriesSelect = self.driver.findElement(By.id('categories'));
        let descriptionTextArea = self.driver.findElement(By.id('description'));
        let nextButton = self.driver.findElement(By.id('nextButton'));


        categoriesSelect.findElement(By.css('option[value="' + category + '"]')).click().then(() => {
            self.driver.findElement(By.id('subCategories'))
                .then((categories2) => categories2.findElement(By.css('option[value="' + subCategory + '"]')).click(), () => { });
        });

        descriptionTextArea.sendKeys(description);
        nextButton.click();
    }

    self.chooseAddressByInput = chooseAddressByInput;
    self.chooseReport = chooseReport;

}

module.exports = reporter;