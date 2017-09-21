const webdriver = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');
const jsonTools = require('../../../../utility/jsonTools');
const categoryJson = require('../../../../data/categories.json');
const By = webdriver.By;
const until = webdriver.until;
const stagingUrl = 'http://staging.baltimorecountymd.gov/baltcogo/reporter';
const constants = require('../constants');
const MonkeyBusiness = require('../monkeyBusiness');
let driver;
let monkeyBusiness;

describe('CitySourced reporter', () => {
    describe('Address Bug', () => {
        before(() => {
            driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
            monkeyBusiness = new MonkeyBusiness(driver);
        });

        beforeEach(() => {
            driver.manage().window().setSize(1200, 1000);
            driver.get(stagingUrl);
        });

        it('A user can move to the third panel of the form with an invalid address', (done) => {
            monkeyBusiness.chooseReport(constants.values.requestType, constants.values.requestSubType, constants.values.requestDescription);

            driver.sleep(1000);

            monkeyBusiness.chooseAddressByInput(constants.values.address);

            driver.sleep(100000);

            done();
        });

        after(function () {
            driver.quit();
        });

    });
});