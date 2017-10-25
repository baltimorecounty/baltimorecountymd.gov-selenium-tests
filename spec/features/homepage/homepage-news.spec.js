const webdriver = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');
const By = webdriver.By;
const until = webdriver.until;
const constants = require('constants').devValues;
const Automater = require('homepage-automater');
let driver;
let automater;

describe('Homepage - News Snippets', () => {
    before(() => {
        driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
        automater = new Automater(driver);
    });

    beforeEach(() => {
        driver.manage().window().setSize(1200, 1000);
        driver.get(constants.url);
    });

    after(function () {
        driver.quit();
    });

    it('Should display four news stories', () => {
        automater.getStories()
            .then((newStories) => {
                var numberOfStories = newStories.length;
                assert(numberOfStories).to.equal(4);
            });
    });

    it('Should display a \'Read More\' news link', () => {

    });

    it('Should display the data in the following format, {Month DayNumber} ', () => {

    });
});