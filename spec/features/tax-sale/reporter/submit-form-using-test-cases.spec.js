const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    productionUrl = 'http://www.baltimorecountymd.gov/Agencies/budfin/customerservice/taxpayerservices/tax_sale/registration2017.html',
    TestCases = require('../test-cases.json');

let driver;

TestCases.forEach((testCase, index) => {
    let expectedResult = testCase.expectedResult === 'success';
    let failureStep = testCase.failureStep || 0;
    let isReportingAsAnIndividual = testCase.step1.registeringAs && testCase.step1.registeringAs.toLowerCase().indexOf("individual") > -1;

    describe(testCase.expectedResultMessage, () => {
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

        expectNextToBeEnabled = (expectedResult, done) => {
            let nextBtn = driver.findElement(By.id('next'));

            nextBtn.isEnabled().then((isEnabled) => {
                expect(expectedResult).toEqual(isEnabled);

                if (done && typeof done === 'function') {
                    done();
                }
            });
        };

        expectSubmitToBeEnabled = (expectedResult, done) => {
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

        hasValidStep1TestData = (data) => {
            if (isReportingAsAnIndividual) {
                return data && data.hasOwnProperty('firstName') && data.firstName &&
                    data.hasOwnProperty('lastName') && data.lastName &&
                    data.hasOwnProperty('streetAddress1') && data.streetAddress1 &&
                    data.hasOwnProperty('streetAddress2') &&
                    data.hasOwnProperty('city') && data.city &&
                    data.hasOwnProperty('state') && data.state &&
                    data.hasOwnProperty('zip') && data.zip &&
                    data.hasOwnProperty('phone') && data.phone &&
                    data.hasOwnProperty('email') && data.email;
            }

            //Is Corporation
            return data && data.hasOwnProperty('companyEntity') && data.companyEntity &&
                data.hasOwnProperty('residentAgentName') && data.residentAgentName &&
                data.hasOwnProperty('streetAddress1') && data.streetAddress1 &&
                data.hasOwnProperty('streetAddress2') &&
                data.hasOwnProperty('city') && data.city &&
                data.hasOwnProperty('state') && data.state &&
                data.hasOwnProperty('zip') && data.zip &&
                data.hasOwnProperty('phone') && data.phone &&
                data.hasOwnProperty('email') && data.email &&
                data.hasOwnProperty('nameOnCertificate') && data.nameOnCertificate &&
                data.hasOwnProperty('isMarylandEntity') &&
                data.hasOwnProperty('personalPropertyTaxId') &&
                data.hasOwnProperty('inGoodStanding');
        };

        performStep1 = (data) => {
            waitForFormSection('TaxSale2013Step1FirstStep').then(() => {
                let registeringAs = isReportingAsAnIndividual ? driver.findElement(By.id('BusinessType1')) : driver.findElement(By.id('BusinessType2'));

                registeringAs.click();

                if (isReportingAsAnIndividual) {
                    let firstName = driver.findElement(By.id('FirstName'));
                    let lastName = driver.findElement(By.id('LastName'));
                    let streetAddress1 = driver.findElement(By.id('StreetAddress1'));
                    let streetAddress2 = driver.findElement(By.id('StreetAddress2'));
                    let city = driver.findElement(By.id('City'));
                    let state = driver.findElement(By.id('State'));
                    let zip = driver.findElement(By.id('ZipCode'));
                    let phone = driver.findElement(By.id('Phone'));


                    firstName.sendKeys(data.firstName);
                    lastName.sendKeys(data.lastName);
                    streetAddress1.sendKeys(data.streetAddress1);
                    streetAddress2.sendKeys(data.streetAddress2);
                    city.sendKeys(data.city);
                    state.sendKeys(data.state); //Probably going to fail
                    zip.sendKeys(data.zip);
                    phone.sendKeys(data.phone);

                } else { //Submitting the form as a Corporation
                    let companyEntity = driver.findElement(By.id('CompanyEntity'));
                    let residentAgentName = driver.findElement(By.id('MDResidentAgentNameBidder'));
                    let phone = driver.findElement(By.id('MDLocalPhone'));
                    let streetAddress1 = driver.findElement(By.id('MDLocalContactAddress'));
                    let streetAddress2 = driver.findElement(By.id('MDLocalContactAddress2'));
                    let city = driver.findElement(By.id('MDLocalContactCity'));
                    let state = driver.findElement(By.id('LocalContactState'));
                    let zip = driver.findElement(By.id('LocalContactZipCode'));
                    let nameOnCertificate = driver.findElement(By.id('NameCertificate'));
                    let isMarylandEntity = data.isMarylandEntity ? driver.findElement(By.id('MarylandEntity1')) : driver.findElement(By.id('MarylandEntity2'));
                    let personalPropertyTaxId = driver.findElement(By.id('PersonalPropertyNumber'));
                    let inGoodStanding = data.inGoodStanding ? driver.findElement(By.id('InGoodStanding1')) : driver.findElement(By.id('InGoodStanding2'));

                    companyEntity.sendKeys(data.companyEntity);
                    residentAgentName.sendKeys(data.residentAgentName);
                    streetAddress1.sendKeys(data.streetAddress1);
                    streetAddress2.sendKeys(data.streetAddress2);
                    city.sendKeys(data.city);
                    state.sendKeys(data.state); //Probably going to fail
                    zip.sendKeys(data.zip);
                    phone.sendKeys(data.phone);
                    nameOnCertificate.sendKeys(data.nameOnCertificate);

                    isMarylandEntity.click();
                    if (isMarylandEntity) {
                        personalPropertyTaxId.sendKeys(data.personalPropertyTaxId);
                    }
                    inGoodStanding.click();
                }

                let email = driver.findElement(By.id('EmailAddress'));
                email.sendKeys(data.email);
            });
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

        it('Has valid test data', (done) => {
            let hasValidTestData = hasValidStep1TestData(testCase.step1);
            expect(true).toEqual(hasValidTestData);
            driver.sleep(1000).then(() => {
                if (done && typeof done === 'function') {
                    done();
                }
            })
        });

        it('Step 1', (done) => {
            performStep1(testCase.step1);
            expectNextToBeEnabled(expectedResult, done);
        });

        if (failureStep > 1 || !failureStep) {
            it('Step 2', (done) => {
                performStep2(testCase.step2);
                expectNextToBeEnabled(expectedResult, done);
            });
        }
        if (failureStep > 2 || !failureStep) {
            it('Step 3', (done) => {
                performStep3(testCase.step3);
                expectNextToBeEnabled(expectedResult, done);
            });
        }
        if (failureStep > 3 || !failureStep) {
            it('Step 4', (done) => {
                performStep4(testCase.step4);
                expectSubmitToBeEnabled(expectedResult, done);
            });
        }

    });
});