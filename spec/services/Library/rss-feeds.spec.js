const chakram = require('chakram'),
	expect = chakram.expect,
	serviceUrl = 'http://localhost:1000/api/libraryfeed';

describe('Get BCPL Blog RSS Feeds', () => {

  it('should return the "Between The Covers" feed', () => {
    
	var response = chakram.get(serviceUrl);
  
    expect(response).to.have.status(200);
    
    return chakram.wait();

  });

  it('should return the "Adult Fiction" feed', () => {
    
	var response = chakram.get(serviceUrl + '/199');
  
    expect(response).to.have.status(200);
    
    return chakram.wait();

  });

  it('should return the "Adult Non-Fiction" feed', () => {
    
	var response = chakram.get(serviceUrl + '/200');
  
    expect(response).to.have.status(200);
    
    return chakram.wait();

  });

  it('should return the "Teen Books" feed', () => {
    
	var response = chakram.get(serviceUrl + '/188');
  
    expect(response).to.have.status(200);
    
    return chakram.wait();

  });

  it('should return the "Children\'s Books" feed', () => {
    
	var response = chakram.get(serviceUrl + '/191');
  
    expect(response).to.have.status(200);
    
    return chakram.wait();

  });

}); 	