const webdriver = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');
const jsonTools = require('../../../../utility/jsonTools');
const categoryJson = require('../../../../data/categories.json');
const By = webdriver.By;
const until = webdriver.until;
const stagingUrl = 'https://dev.baltimorecountymd.gov/iwant/report.html';
const constants = require('../constants').devValues;
const Reporter = require('../reporter');
let driver;
let reporter;

describe('CitySourced reporter', () => {
    describe('Should not be able to submit a partial address', () => {
        before(() => {
            driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
            reporter = new Reporter(driver);
        });

        beforeEach(() => {
            driver.manage().window().setSize(1200, 1000);
            driver.get(stagingUrl);
        });

        it('A user should not be able to submit an invalid address and move to the contact panel', (done) => {
            reporter.chooseReport(constants.requestType, constants.requestSubType, constants.requestDescription);

            driver.sleep(1000);

            reporter.chooseAddressByInput(constants.address);

            driver.sleep(10000);

            let emailTextBox = driver.findElement(By.id('email'));

            driver.wait(until.elementLocated(By.id('email')), 10000).then((email) => {
                email.isDisplayed().then((isDisplayed) => {
                    expect(isDisplayed).to.equal(false);
                    done();
                });
            });

        });

        after(function () {
            driver.quit();
        });

    });
});