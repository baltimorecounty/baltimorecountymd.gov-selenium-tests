const webdriver = require('selenium-webdriver');
const chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const _ = require('lodash');
const By = webdriver.By;
const until = webdriver.until;
const Automater = require('../automater');

const reportTypes = [
    {
        name: "Lost Property",
        url: "http://staging.baltimorecountymd.gov/_Test/police-online-reporting/lostproperty.html"
    },
    {
        name: "Abandoned Motor Vehicle",
        url: "http://staging.baltimorecountymd.gov/_Test/police-online-reporting/abandoned.html"
    },
    {
        name: "Destruction of Property",
        url: "http://staging.baltimorecountymd.gov/_Test/police-online-reporting/destructionofproperty.html"
    },
    {
        name: "Hit and Run",
        url: "http://staging.baltimorecountymd.gov/_Test/police-online-reporting/hitrun.html"
    },
    {
        name: "Theft",
        url: "http://staging.baltimorecountymd.gov/_Test/police-online-reporting/theft.html"
    }
];

reportTypes.forEach((reportType) => {
    describe(`Police Online Reporting - ${reportType.name}`, () => {
        let driver;
        let automater;

        before(() => {
            driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
            automater = new Automater(driver);
        });

        beforeEach(() => {
            driver.get(reportType.url);
        });

        after(function () {
            driver.quit();
        });


        it('Should allow a user to file a report online', (done) => {
            automater.selectAnswer('input.correct, input.noanswer')
                .then(automater.isReportButtonAvailable)
                .then((isAvailable) => {
                    expect(isAvailable).to.equal(true);
                    done();
                })
                .catch((err) => {
                    let errName = err.name || null;
                    expect(errName).to.equal(null);
                    done();
                });
        });

        it('Should not allow a user to file a report online with bad answers', (done) => {
            automater.selectAnswer('.question-container input:not(.correct)')
                .then(automater.isReportButtonAvailable)
                .then((isAvailable) => {
                    expect(isAvailable).to.equal(false);
                    done();
                })
                .catch((err) => {
                    let errName = err.name || null;
                    expect(errName).to.equal("ElementNotVisibleError");
                    done();
                });
        });

    });
});






