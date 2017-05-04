const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
	productionUrl = 'http://www.baltimorecountymd.gov/Agencies/budfin/customerservice/taxpayerservices/tax_sale/registration2017.html';

let driver;

describe('Tax Sale reporter', () => {
    let step1 = { 
        registeringAs: null,
        firstName: null,
        lastName: null,
        streetAddress1: null,
        streetAddress2: null,
        city: null,
        state: null,
        zip: null,
        phone: null,
        email: null
    };
    let step2 = { 
        agreeToCollectersTerm: false,
        agreeToInternetProcedures: false 
    };
    let step3 = { 
        legalEntity: null,
        businessName: null,
        typeOfBusiness: null,
        address1: null,
        address2: null,
        city: null,
        state: null,
        zip: null,
        phone: null,
        taxId: null,
        withHoldingBackup: false
    };
    let step4 = {
        typeOfAcccount: null,
        accountEntity: null,
        bankName: null,
        routingNumber: null,
        accountNumber: null,
        confirmAccountNumber: null,
        electronicSignature: false
    };


	describe('Can submit a report as an individual', () => {
        beforeAll(() => {
			driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
            driver.get(productionUrl);
		});

        beforeEach(() => {
			
		});

        afterAll(function() {
			driver.quit();
		});


        clickNext = () => {
            let nextBtn = driver.findElement(By.id('next'));
            return nextBtn.click();
        };

        waitForFormSection = (formId) => {
            driver.findElement(By.id(formId)).then((targetForm) => {
                return driver.wait(until.elementIsVisible(targetForm), 10000);
            });
        };

        performStep1 = () => {
            let registeringAs = driver.findElement(By.id('BusinessType1'));
            let firstName = driver.findElement(By.id('FirstName'));
            let lastName = driver.findElement(By.id('LastName'));
            let streetAddress1 = driver.findElement(By.id('StreetAddress1'));
            let streetAddress2 = driver.findElement(By.id('StreetAddress2'));
            let city = driver.findElement(By.id('City'));
            let state = driver.findElement(By.id('State'));
            let zip = driver.findElement(By.id('ZipCode'));
            let phone = driver.findElement(By.id('Phone'));
            let email = driver.findElement(By.id('EmailAddress'));

            registeringAs.click();

            firstName.sendKeys("John");
            lastName.sendKeys("Doe");
            streetAddress1.sendKeys("400 Washington Ave");
            streetAddress2.sendKeys("");
            city.sendKeys("Towson");
            state.sendKeys("Maryland"); //Probably going to fail
            zip.sendKeys("21204");
            phone.sendKeys("2222222222");
            email.sendKeys("jdoe@baltimorecountymd.gov");
        }

        performStep2 = () => {
            clickNext().then(() => {
                waitForFormSection('TaxSale2013Step4').then((targetForm) => {
                    driver.sleep(1000).then(() => {
                        let agreeToCollectersTerm = driver.findElement(By.id('CollectorTermsCheck'));
                        let agreeToInternetProcedures = driver.findElement(By.id('InternetProceduresCheck'));

                        agreeToCollectersTerm.click().then(() => {
                            agreeToInternetProcedures.click().then(() => {
                            });
                        });
                    });
                })
                // driver.findElement(By.id('TaxSale2013Step4')).then((taxStep2) => {
                //     driver.wait(until.elementIsVisible(taxStep2), 10000).then((element) => {
                        
                //     });
                // });
            });
        }

        performStep3 = () => {
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

            clickNext().then(() => {
                driver.findElement(By.id('TaxSale2013Step5')).then((taxStep3) => {
                    driver.wait(until.elementIsVisible(taxStep3), 10000).then((element) => {
                        driver.sleep(1000).then(() => {
                            legalEntity.sendKeys("Legit Legal Entity Corp");
                            businessName.sendKeys("Really Legit Legal Entity Corp");
                            typeOfBusiness.sendKeys("Financial");
                            address1.sendKeys("200 Washington Ave");
                            address2.sendKeys("");
                            city.sendKeys("Towson");
                            state.sendKeys("Maryland");
                            zip.sendKeys("21204");
                            phone.sendKeys("2222222222");
                            taxId.sendKeys("999999999");
                        });
                    });
                });
            });
        }

        performStep4 = () => {
            let typeOfAcccount = driver.findElement(By.id('AccountType1'));
            let accountEntity = driver.findElement(By.id('EntityName'));
            let bankName = driver.findElement(By.id('BankName'));
            let routingNumber = driver.findElement(By.id('RoutingNumber'));
            let accountNumber = driver.findElement(By.id('AccountNumber'));
            let confirmAccountNumber = driver.findElement(By.id('AccountNumberConfirm'));
            let electronicSignature = driver.findElement(By.id('ElectronicSignature'));

            clickNext().then(() => {
                driver.findElement(By.id('TaxSale2013Step6')).then((taxStep3) => {
                    driver.wait(until.elementIsVisible(taxStep3), 10000).then((element) => {
                        driver.sleep(1000).then(() => {
                            typeOfAcccount.click();
                            accountEntity.sendKeys("Legit Legal Entity Corp");
                            bankName.sendKeys("ABC BANK");
                            routingNumber.sendKeys("111111111");
                            accountNumber.sendKeys("123456789123");
                            confirmAccountNumber.sendKeys("123456789123");
                            electronicSignature.click();
                        });
                    });
                });
            });
            
        }

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

        it('Can Fill out Step 1 successfully', (done) => {
            performStep1();
            expectNextToBeEnabled(done);
        });

        it('Can Fill out Step 2 successfully', (done) => {
            performStep2();
            expectNextToBeEnabled(done);
        });

        it('Can Fill out Step 3 successfully', (done) => {
            performStep3();
            expectNextToBeEnabled(done);
        });

        it('Can Fill out Step 4 successfully', (done) => {
            performStep4();
            expectSubmitToBeEnabled(done);
        });
    });
});