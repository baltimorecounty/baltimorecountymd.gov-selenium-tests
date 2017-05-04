const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    productionUrl = 'http://www.baltimorecountymd.gov/Agencies/budfin/customerservice/taxpayerservices/tax_sale/registration2017.html',
    TestCases = require('../test-cases.json');

let driver;

describe('Tax Sale reporter', () => {
    describe('Can submit a report as an individual', () => {
        beforeAll(() => {
            driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
            driver.get(productionUrl);
        });
        
        afterAll(function() {
            driver.quit();
        });

        clickNext = () => {
            let nextBtn = driver.findElement(By.id('next'));
            return nextBtn.click();
        };

        expectNextToBeEnabled = (done) => {
            let nextBtn = driver.findElement(By.id('next'));

            nextBtn.isEnabled().then((isEnabled) => {
                expect(true).toEqual(isEnabled);
                if (done && typeof done === 'function') {
                    done();
                }
            });
        };

        expectSubmitToBeEnabled = (done) => {
            let submitBtn = driver.findElement(By.id('submit'));

            submitBtn.isEnabled().then((isEnabled) => {
                expect(true).toEqual(isEnabled);
                if (done && typeof done === 'function') {
                    done();
                }
            });
        };

        waitForFormSection = (formId) => {
            return driver.findElement(By.id(formId)).then((targetForm) => {
                return driver.wait(until.elementIsVisible(targetForm), 10000).then(() => {
                    return driver.sleep(1000);
                });
            });
        };

        performStep1 = (data) => {
            var isIndividual = data.registeringAs && data.registeringAs.toLowerCase().indexOf("individual") > -1;
            let registeringAs = isIndividual ? driver.findElement(By.id('BusinessType1')) : driver.findElement(By.id('BusinessType2'));

            let firstName = driver.findElement(By.id('FirstName'));
            let lastName = driver.findElement(By.id('LastName'));
            let streetAddress1 = driver.findElement(By.id('StreetAddress1'));
            let streetAddress2 = driver.findElement(By.id('StreetAddress2'));
            let city = driver.findElement(By.id('City'));
            let state = driver.findElement(By.id('State'));
            let zip = driver.findElement(By.id('ZipCode'));
            let phone = driver.findElement(By.id('Phone'));
            let email = driver.findElement(By.id('EmailAddress'));

            //TODO: Add Business Fields

            registeringAs.click();

            firstName.sendKeys(data.firstName);
            lastName.sendKeys(data.lastName);
            streetAddress1.sendKeys(data.streetAddress1);
            streetAddress2.sendKeys(data.streetAddress2);
            city.sendKeys(data.city);
            state.sendKeys(data.state); //Probably going to fail
            zip.sendKeys(data.zip);
            phone.sendKeys(data.phone);
            email.sendKeys(data.email);
        };

        performStep2 = (data) => {
           completeForm = () => {
                let agreeToCollectersTerm = driver.findElement(By.id('CollectorTermsCheck'));
                let agreeToInternetProcedures = driver.findElement(By.id('InternetProceduresCheck'));

                if (data.agreeToCollectersTerm && data.agreeToInternetProcedures) {
                    agreeToCollectersTerm.click().then(() => {
                        agreeToInternetProcedures.click();
                    });
                }
           }

            clickNext().then(() => {
                waitForFormSection('TaxSale2013Step4').then(completeForm);
            });
        };

        performStep3 = (data) => {
            let legalEntity = driver.findElement(By.id('NameW9'));
            let businessName = driver.findElement(By.id('BusinessName'));
            let typeOfBusiness = driver.findElement(By.id('businesstype'));
            let address1 = driver.findElement(By.id('AddressW9'));
            let address2 = driver.findElement(By.id('AddressW92'));
            let city = driver.findElement(By.id('CityW9'));
            let state = driver.findElement(By.id('StateW9'));
            let zip = driver.findElement(By.id('ZipCodeW9'));
            let phone = driver.findElement(By.id('PhoneW9'));
            let taxId = driver.findElement(By.id('TaxpayerID'));
            let withHoldingBackup = driver.findElement(By.id('NoWithholding'));

            completeForm = () => {
                legalEntity.sendKeys(data.legalEntity);
                businessName.sendKeys(data.businessName);
                typeOfBusiness.sendKeys(data.typeOfBusiness);
                address1.sendKeys(data.address1);
                address2.sendKeys(data.address2);
                city.sendKeys(data.city);
                state.sendKeys(data.state);
                zip.sendKeys(data.zip);
                phone.sendKeys(data.phone);
                taxId.sendKeys(data.taxId);

                if (data.withHoldingBackup) {
                    withHoldingBackup.click();
                }
            };

            clickNext().then(() => {
                waitForFormSection('TaxSale2013Step5').then(completeForm);
            });
        };

        performStep4 = (data) => {
            let isSavings = data.typeOfAcccount && data.typeOfAcccount.toLowerCase().indexOf("checking") > -1;
            let typeOfAcccount = isSavings ? driver.findElement(By.id('AccountType1')) : driver.findElement(By.id('AccountType2'));
            let accountEntity = driver.findElement(By.id('EntityName'));
            let bankName = driver.findElement(By.id('BankName'));
            let routingNumber = driver.findElement(By.id('RoutingNumber'));
            let accountNumber = driver.findElement(By.id('AccountNumber'));
            let confirmAccountNumber = driver.findElement(By.id('AccountNumberConfirm'));
            let electronicSignature = driver.findElement(By.id('ElectronicSignature'));

            completeForm = () => {
                typeOfAcccount.click();
                accountEntity.sendKeys(data.accountEntity);
                bankName.sendKeys(data.bankName);
                routingNumber.sendKeys(data.routingNumber);
                accountNumber.sendKeys(data.accountNumber);
                confirmAccountNumber.sendKeys(data.confirmAccountNumber);

                if (data.electronicSignature) {
                    electronicSignature.click();
                }
            };

            clickNext().then(() => {
                waitForFormSection('TaxSale2013Step6').then(completeForm);
            });
        }


        TestCases.forEach((testCase, index) => {

            it('Can Fill out Step 1 successfully: ' + testCase.expectedResultMessage, (done) => {
                performStep1(testCase.step1);
                expectNextToBeEnabled(done);
            });

            it('Can Fill out Step 2 successfully: ' + testCase.expectedResultMessage, (done) => {
                performStep2(testCase.step2);
                expectNextToBeEnabled(done);
            });

            it('Can Fill out Step 3 successfully: ' + testCase.expectedResultMessage, (done) => {
                performStep3(testCase.step3);
                expectNextToBeEnabled(done);
            });

            it('Can Fill out Step 4 successfully: ' + testCase.expectedResultMessage, (done) => {
                performStep4(testCase.step4);
                expectSubmitToBeEnabled(done);
            });

        });
    });
});