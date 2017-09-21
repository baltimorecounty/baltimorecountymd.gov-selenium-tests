const webdriver = require('selenium-webdriver');
//const _ = require('lodash');
const By = webdriver.By;
const until = webdriver.until;

function monkeyBusiness(driver) {
    var self = this;
    self.driver = driver;

    let nextButton = self.driver.findElement(By.id('nextButton'));

    function chooseAddressByInput(value) {
        let addressInput = self.driver.findElement(By.id('address'));
        addressInput.sendKeys(value);

        nextButton.click();
    }

    function chooseReport(category, subCategory, description) {
        let categoriesSelect = self.driver.findElement(By.id('categories'));
        let subCategoriesSelect = self.driver.findElement(By.id('subCategories'));
        let descriptionTextArea = self.driver.findElement(By.id('description'));

        categoriesSelect.findElement(By.css('option[value="' + category + '"]')).click().then(() => {
            subCategoriesSelect
                .then((categories2) => categories2.findElement(By.css('option[value="' + subCategory + '"]')).click(), () => { });
        });

        descriptionTextArea.sendKeys(description);
        nextButton.click();
    }

    self.chooseAddressByInput = chooseAddressByInput;
    self.chooseReport = chooseReport;

}

module.exports = monkeyBusiness;