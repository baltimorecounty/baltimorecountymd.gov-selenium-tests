const webdriver = require('selenium-webdriver');
const chai = require('chai');
const expect = chai.expect;
const _ = require('lodash');
const By = webdriver.By;
const until = webdriver.until;
const constants = require('./constants');
const Automater = require('./homepage-carousel.automater');
let driver;
let automater;

describe('Homepage - Carousel', () => {
    it('Should contain at least one item', (done) => {
        automater.getItems()
            .then((items) => {
                expect(items.length).to.least(1);
                done();
            })
            .catch((err) => handleException(err, done));
    });

    it('Should change slides every 5 seconds if there is more than 1 item', (done) => {
        automater.checkForRotation(constants.carouselDelay)
            .then((isRotating) => {
                expect(isRotating).to.equal(true);
                done();
            })
            .catch((err) => handleException(err, done));
    });

    it('Should be displayed behind the search component', (done) => {
        automater.isCarouselBehindSearch()
            .then((isCarouselBehindSearch) => {
                expect(isCarouselBehindSearch).to.equal(true);
                done();
            })
            .catch((err) => handleException(err, done));
    });

    it('Should pause rotation if the mouse is hovered over an item', (done) => {
        automater.isCarouselPaused(10000)
            .then((isCarouselPaused) => {
                expect(isCarouselPaused).to.equal(true);
                done();
            })
            .catch((err) => handleException(err, done));
    });

    before(() => {
        driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
        automater = new Automater(driver);
    });

    beforeEach(() => {
        driver.get(constants.url);
    });

    after(function () {
        driver.quit();
    });
});

function handleException(err, done) {
    console.log(err);
    let errName = err.name || null;
    expect(errName).to.equal(null);
    done();
}