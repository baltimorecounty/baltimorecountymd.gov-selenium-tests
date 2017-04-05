const chakram = require('chakram'),
	expect = chakram.expect,
	serviceUrl = 'http://localhost:1000/api/docket';

describe('Court Docket', () => {

	it('gets the docket information', () => {

		var response = chakram.get(serviceUrl);
  
    	expect(response).to.have.status(200);
    
    	return chakram.wait();

	});

});